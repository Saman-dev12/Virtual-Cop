import { mainnet } from "viem/chains";
import { createConfig, http, injected } from "wagmi";
import { metaMask } from "wagmi/connectors";

export const config = createConfig({
    chains:[mainnet],
    connectors:[
        metaMask(),
    ],
    transports:{
        [mainnet.id] : http()
    }
})