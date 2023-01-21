import * as React from "react";
import { Box, Image, Flex, Badge, Text } from "@chakra-ui/react";
import { Movie, TvShow } from "@/data";
import Link from "next/link";

type CardPropsType = {
    details: TvShow & Movie;
}
export default function Card({ details }: CardPropsType) {

    return (
        <Box marginInline={2}>
            <Link href={`/details/${details?.id}`}>
                <Flex p='6' w='340px' direction='column'
                    bgGradient='linear(to-b, rgba(255, 255, 255, .1), rgba(100, 100, 100, 0))' borderRadius='6px'>
                    <Box overflow='hidden' borderRadius='6px'>
                        <Image alt='show image' h='100%' fit='cover' src={details?.cover_url} />
                    </Box>
                    <Box mt={3} mb={2} w='100%'>
                        <Flex align='baseline'>
                            <Badge colorScheme='pink'>{details?.type}</Badge>
                            <Text
                                ml={2}
                                textTransform='uppercase'
                                fontSize='sm'
                                fontWeight='bold'
                                color='pink.800'
                            >
                                {details?.saga}
                            </Text>
                        </Flex>
                    </Box>
                    <Box mb={3} w='100%'>
                        {
                            details?.release_date && <Text fontSize='xs'>
                                <b>Release date :</b> {details?.release_date}
                            </Text>
                        }
                    </Box>
                    <Box mb={3}>
                        <Text fontSize='xl' fontWeight='semibold'>
                            {details?.title}
                        </Text>
                    </Box>
                </Flex>
            </Link>
        </Box>
    );
}
