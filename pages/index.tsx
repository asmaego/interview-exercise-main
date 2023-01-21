import { useState } from "react";
import { useQuery } from "react-query";
import { Wrap, WrapItem } from '@chakra-ui/react';
import { Movie, TvShow } from "@/data";
import Spinner from "@/components/Spinner";
import Card from "@/components/Card";
import Filter from "@/components/Filter";

const filterData = [
    { id: 'all', value: '', label: 'All' },
    { id: 'movie', value: 'movie', label: 'Movies' },
    { id: 'tvShow', value: 'tvShow', label: 'Tv Shows' },
]

async function getMarvel(type: string) {
    const res = await fetch(`/api/marvel?type=${type}`);
    return res.json();
}

const Home = () => {

    const [type, setType] = useState(filterData[0].value);

    const { data, isLoading } = useQuery(["marvel", type], () => getMarvel(type));

    return <>
        <Filter data={filterData} onChange={(t) => setType(t)} selected={type} />

        {isLoading && <Spinner />}
        {!isLoading &&
            <div>
                <Wrap marginInline={10} justify='center' spacing='2'>
                    {(data as Array<TvShow & Movie>)?.map((details: TvShow & Movie) =>
                        <WrapItem key={details?.id}>
                            <Card key={details.id} details={details} />
                        </WrapItem>
                    )}
                </Wrap>
            </div>
        }
    </>;
};

export default Home;
