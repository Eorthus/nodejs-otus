export const computedMixinWrapper = (computedName: string, func: () => void) => ({ computed: { [computedName]: func } })
