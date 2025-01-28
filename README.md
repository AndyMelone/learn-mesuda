## GUIDE


### PRE-REQUIS
 - node Js ( v >=20 )
 - Docker & Docker compose
 - git


### INSTALLATION
```zsh
git clone 
```

### INSTALL DEPENDENCIES
```zsh
yarn install
```

### Docker
```zsh
docker compose up -d
```

### RUN MIGRATION
```zsh
yarn predeploy
```

### CREATE ADMIN USER
```zsh
npx medusa user -e admin@medusajs.com -p supersecret
```

 
### RUN APPLICATION
```zsh
yarn run dv
```
