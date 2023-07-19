import { push } from "svelte-spa-router";
import { writable } from "svelte/store";

const initGoRoute: () => void = () => push('/')

export const goHomeCallback = writable<() => void>(initGoRoute)
export const goLoginCallback= writable<() => void>(initGoRoute)