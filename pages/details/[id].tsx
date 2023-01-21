import * as React from "react";
import { useRouter } from "next/router";
import {
    Box,
    Flex,
    Heading,
    Image,
    Text,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Stack, HStack, Tag
} from "@chakra-ui/react";
import { DragHandleIcon } from '@chakra-ui/icons';
import { useQuery } from "react-query";
import Spinner from "components/Spinner";
import { useEffect } from "react";
import { Movie, TvShow } from "@/data";

async function loadMovieData(id: string) {
    const res = await fetch(`/api/marvel/${id}`);
    return res.json();
}

type DetailsContentType = {
    data: TvShow & Movie;
}

export default function Details() {
    const router = useRouter();
    const { id } = router.query;
    const { data, isLoading, refetch } = useQuery("marvelDetails", () => loadMovieData(id as string), { enabled: false });

    useEffect(() => {
        if (id) {
            refetch();
        }
    }, [id, refetch])

    return <>
        <Stack>
            <Breadcrumb ml={{ base: 4, md: 6 }} mr={{ base: 4, md: 6 }} borderWidth='1px' p={3}>
                <BreadcrumbItem>
                    <BreadcrumbLink href='/'><b>Home</b></BreadcrumbLink>
                </BreadcrumbItem>

                {
                    data?.type && <BreadcrumbItem>
                        <BreadcrumbLink href='/'><b
                            style={{ textTransform: 'capitalize' }}>{data?.type}</b></BreadcrumbLink>
                    </BreadcrumbItem>
                }

                {
                    data?.title && <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href='#' noOfLines={1}><b>{data?.title}</b></BreadcrumbLink>
                    </BreadcrumbItem>
                }

            </Breadcrumb>
        </Stack>
        {
            isLoading && <Spinner />
        }
        {
            !isLoading && <DetailsContent data={data} />
        }
    </>
}

function DetailsContent({ data }: DetailsContentType) {
    const basicBoxStyles = {
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        background:
            `url(${data?.cover_url}) center/cover no-repeat`,
    };

    return <Flex h='100vh' direction='column' alignItems='center'>
        <Box sx={basicBoxStyles} filter='auto' blur='10px' brightness='25%'
            style={{ position: 'absolute', zIndex: -100, bottom: 0 }} />

        <Box w='100%' p={4} display={{ md: 'flex' }}>
            <Box ml={{ md: 6 }} mr={{ md: 6 }} flexShrink={0} alignSelf='center'>
                <Image
                    borderRadius='lg'
                    h={{ base: '100%', md: '900px' }}
                    src={data?.cover_url}
                    alt='movie name'
                />
            </Box>
            <Box ml={{ md: 50 }}>
                <Heading size='4xl'>{data?.title}</Heading>
                <HStack mt='8' mb='6' spacing='18px' direction='row' alignItems='center'>
                    <Tag p={2} fontSize='2xl' style={{ textTransform: 'capitalize' }}>{data?.type} </Tag>
                    {data?.season && <Tag p={2} fontSize='2xl'>Season {data?.season} </Tag>}
                    {data?.number_episodes && <Tag p={2} fontSize='2xl'>{data?.number_episodes} Episodes</Tag>}
                </HStack>
                <HStack mb='8' spacing='18px' direction='row' alignItems='center'>
                    <Tag p={2} fontSize='1xl'>{data?.saga} </Tag>
                    <DragHandleIcon />
                    <Text fontSize='1xl'> {data?.release_date}</Text>
                </HStack>
                <Flex minW={{ md: '220px' }} mb='8' pt={4} pb={4} paddingInline={6} borderRadius="2xl"
                    direction='column'
                    w={{ base: '100%', md: '60%' }}
                    bgGradient='linear(to-r, rgba(255, 255, 255, .1), rgba(100, 100, 100, .1))'>
                    <Box display={{ md: 'flex' }} mb={6}>
                        {
                            !!data?.duration &&
                            <Box alignContent='center' w={{ base: '100%', md: '50%' }}>
                                <Text mb={2} fontSize='2xl'> <b>Duration</b></Text>
                                <Text fontSize='1xl'> {data?.duration} minutes</Text>
                            </Box>
                        }
                        {
                            !!data?.last_aired_date &&
                            <Box alignContent='center' w={{ base: '100%', md: '50%' }}>
                                <Text mb={2} fontSize='2xl'> <b>Last Aired Date</b></Text>
                                <Text fontSize='1xl'> {data?.last_aired_date}</Text>
                            </Box>
                        }
                        {
                            !!data?.directed_by &&
                            <Box alignContent='center' w={{ base: '100%', md: '50%' }}>
                                <Text mb={2} fontSize='2xl'> <b>Directed By</b></Text>
                                <Text fontSize='1xl'> {data?.directed_by}</Text>
                            </Box>
                        }
                    </Box>
                    <Box display={{ md: 'flex' }} mt={6} mb={6}>
                        {
                            !!data?.overview &&
                            <Box alignContent='center' w='100%'>
                                <Text mb={2} fontSize='2xl'> <b>Story Line</b></Text>
                                <Text fontSize='1xl'> {data?.overview}</Text>
                            </Box>
                        }

                    </Box>
                    {
                        data?.trailer_url &&
                        <Box w={{ base: '100%', md: '100%' }}>
                            <Box style={{
                                position: 'relative',
                                overflow: 'hidden',
                                width: '100%',
                                paddingTop: '56.25%'
                            }}
                            >
                                <iframe
                                    style={{
                                        position: 'absolute',
                                        top: '0',
                                        left: '0',
                                        bottom: '0',
                                        right: '0',
                                        width: '100%',
                                        height: '100%'
                                    }}
                                    src={data?.trailer_url}>
                                </iframe>
                            </Box>
                        </Box>
                    }
                </Flex>
            </Box>
        </Box>
    </Flex>
}