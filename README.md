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
