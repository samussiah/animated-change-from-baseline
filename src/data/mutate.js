import hasVariables from './mutate/hasVariables';
import mapVariables from './mutate/mapVariables';
import addVariables from './mutate/addVariables';
import sort from './mutate/sort';

export default function mutateData() {
    // Check for existence of variables.
    const has = hasVariables.call(this);

    // Apply data mappings.
    mapVariables.call(this);

    // Define new variables.
    addVariables.call(this, has);

    // Sort data.
    sort.call(this);
}
