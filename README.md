# Modular Vue 3 + Vuex + Vue Router + TypeScript + Vite

This template provides modular Vue.js project incorporating Vuex, Vue Router with TypeScript support and Composition API `<script setup>` SFCs. Check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Template structure
```bash
├───src                 # Vue.js app sources
│   ├───modules         # Project modules
|       ├───index.ts    # The one file handles modules registration
│   ├───router          # Vue Router basic configuration
│   └───store           # Vuex basic configuration
|   └───index.ts        # Main project file, creates Vue.js app and registers app modules
└───utils               # Utility stuff (e.g. module init)
```

## Template usage
```bash
npx degit tinytengu/vue-modular myproject
cd myproject
npm run install
```

## Create a module
```bash
# From project root
node utils module init --name modulename
node utils module init --name modulename --force # Override existing module if exists
node utils module init --name modulename --no-store # Do not generate vuex storage file (store.ts)
node utils module init --name modulename --no-routes # Do not generate routes file (routes.ts)
```

## Remove a module
```bash
# From project root
nodejs utils module remove --name modulename
```
