### Pattern matching

```
{...
Number n = new Integer(5);
if(!n instanceof Integer i && i > 6) {
	
} else {
System.out.println(i.intValue()) // will work cause i is in scope here 
and we 100% sure it is int
}

...
}

```

- The type of the pattern variable must be a compatible type, which includes
  the same type, a subtype, or a supertype of the reference variable. 

- Unlike traditional local variables, which are scoped to the entire enclosing block `{ ... }`, a pattern variable's scope is determined by **flow analysis**. It is only in scope where the compiler can absolutely guarantee that the `instanceof` check succeeded (`true`).

### Switch
- Statement - default switch not returns any value
- Expression - returns value from switch

The following is a list of all data types supportedby switch:
- int and Integer
- byte and Byte
- short and Short
- char and Character
- String
- enum values
- All object types (when used with pattern matching)

*Note*: Not just any values can be used in a case clause. First, the values in each
case clause must be compile-time constant values. This means you can use
only literals, enum constants, or final constant variables.

*Note*: take account to case order, cause we can introduce unreachable code

##### Switch Expression
To return value from switch expression use yield in case of block.
```
int a = (smth) {
  case "Value1" -> 1;
  case "Value2" -> {
	  ...
	  yield 5
  }
};
```
*Note*: we don't need to put ; after block but we forced to use it if block not used as in example above, also after switch expression ; is required

*Note*: We can not use return inside case in switch expression, if we want to return use return before swith expression e.g: ```return switch(value) {...}```

*Note*: Switch can work with null in case object is passed as parameter. If null case will be not there NPE will be thrown.

```
String fish = null;
System.out.print(switch (fish) {
	case "ClownFish" -> "Hello!";
	case "BlueTang" -> "Hello again!";
	case null -> "What type of fish are you?";
	default -> "Goodbye";
});
```
##### Pattern Matching with switch

```
void printDetails(Number height) {
	String message = switch (height) {
		case Integer i -> "Rounded: " + i;
		case Double d -> "Precise: " + d;
		case Number n -> "Unknown: " + n;
	};
	System.out.print(message);
}
```

Additionally guard 'when' can be used to extend case with additional range condition after pattern matching

```
String getTrainer(Number height) {
	return switch (height) {
		case Integer i when i > 10 -> "Joseph";
		case Integer i -> "Daniel";
		case Double num when num <= 15.5 -> "Peter";
		case Double num -> "Kelly";
		case Number num -> "Ralph";
	};
}
```



