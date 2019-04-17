# theia-pkg
This is a POC to bundle Theia into one single executable.
See: https://github.com/theia-ide/theia/issues/4541

# Prerequisites
Defined [here](https://github.com/theia-ide/theia/blob/master/doc/Developing.md#prerequisites).

# Install
To install the dependencies.
```
yarn
```

# Build
To generate the application code for both the frontend and the backend.
```
yarn build
```

# Package
To bundle Theia into a single executable with [`pkg`](https://github.com/zeit/pkg).
Your executable will be under the `dist` folder.
```
yarn package
```

