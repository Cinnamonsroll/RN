# RN

RN is an interpreter which converts to JSON

## Rules

```
{name} = "Calculator";
```

this returns ```json
{
"name": "Calculator"
}```

You must end a line in a semi colon or it will not be parsed

RN has functions or atleast one function currently which is ^ and it can be used as

```
{name} = "*mit^*";
``` 

which returns

```json
{
"name": "MIT"
}
```

you can also use existing variables

```
{name} = "calc";

{desc} = ":name: meow";
```

Outputs

```json
{
"name": "calc",
"desc": "calc meow"
}
```

And you can also nest

```
{name} = ("start": "test");
```

outputs

```json
{
"name": {
"start": "test"
}
}
```


Example:
```
{name} = "calculator"; 
{version} = "1.0.0"; 
{description} = ":name: created in js"; 
{main} = "index.js"; 
{author} = "Velddev"; 
{license} = "*mit^*"; 
{scripts} = ("start":"node src/index"); 
{devDependencies} = ("jest":"^27.2.5", "canvas":"^0.1.1");
```
outputs

```json
{
  "author": "Velddev",
  "description": "calculator created in js",
  "devDependencies": {
    "canvas": "^0.1.1",
    "jest": "^27.2.5"
  },
  "license": "MIT",
  "main": "index.js",
  "name": "calculator",
  "scripts": {
    "start": "node src/index"
  },
  "version": "1.0.0"
}
```
