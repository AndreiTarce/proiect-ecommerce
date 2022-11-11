import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
    storage: sessionStorage,
});

export const signedInState = atom({
    key: "signedInState",
    default: false,
    effects_UNSTABLE: [persistAtom],
});
