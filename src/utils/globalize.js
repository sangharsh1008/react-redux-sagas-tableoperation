import _ from "lodash";

export type Selector<T, State = GlobalState> = (state: State) => T;
export type GlobalState = {
  profile: Object,
  features: Object,
  entities: Object,
  framework: Object
};
export default <ReturnType>(
  selector: (...args: any[]) => ReturnType,
  path: string
) => (globalState: Object) => {
  const state = _.get(globalState, path);
  console.log(globalState);
  return selector(globalState);
};
