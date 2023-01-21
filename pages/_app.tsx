import { ChakraProvider, Heading, Stack } from "@chakra-ui/react";
import { MoonIcon } from '@chakra-ui/icons'
import type { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import theme from '@/config/theme'

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Marvel Universe</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Stack h="100%" w="100%">
            <Heading alignSelf={"center"} mt={92} mb={92} justifyContent={"center"} alignItems={"center"}> <MoonIcon/> Marvel Universe</Heading>
            <Component {...pageProps} />
          </Stack>
        </ChakraProvider>
      </QueryClientProvider>
    </>
  );
}
