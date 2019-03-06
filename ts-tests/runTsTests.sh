#!/usr/bin/env bash

# here as a quick ts test for use in the CI
# in time this will be removed the full battery of tests be moved to a centralised location

error_found=false

# has an invalid property - should complain
./node_modules/.bin/tsc --target "ES5" --module 'commonjs' --lib esnext,dom --allowSyntheticDefaultImports --jsx 'preserve' --noEmit --strict ts-tests/InvalidGridProperty.tsx &> /dev/null
if [ $? -ne 0 ]; then
    echo "ag-grid-react grid with invalid property should throw a compiler error"
    error_found=true
fi

# a valid grid - no errors should be emitted
./node_modules/.bin/tsc --target "ES5" --module 'commonjs' --lib esnext,dom --allowSyntheticDefaultImports --jsx 'preserve' --noEmit --strict ts-tests/SimpleFunctionalGrid.tsx &> /dev/null
if [ $? -ne 0 ]; then
    echo "valid ag-grid-react grid should compile"
    error_found=true
fi

if [ "$error_found" = true ]; then
    exit 1
fi

exit 0
