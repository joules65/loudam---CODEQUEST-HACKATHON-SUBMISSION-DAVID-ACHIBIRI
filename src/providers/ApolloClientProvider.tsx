import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { PropsWithChildren } from "react";

const client = new ApolloClient({
    uri: "https://publiccfb266ce4ed65d2a.stepzen.net/api/winning-armadillo/__graphql",
    headers: {
        Authorization: 'apikey kanyuran::local.net+1000::cfe0cacb1e6d0623785b2c3cba9214a3d600f8761f0dbf52b1fdf41a59752ae4',
    },
    cache: new InMemoryCache(),
});

const ApolloClientProvider = ({ children }: PropsWithChildren) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>
     
};

export default ApolloClientProvider;