### Bitwise negation operator (~)
~x = -x - 1 
~70  = -70 -1 = -71
How calculate:
`00000000 00000000 00000000 01000110` - 2^8 + 2^2 + 2^1 = 64 + 4 + 2 = 70
Reversed:
`11111111 11111111 11111111 10111001`  - Left most bit with '-', so -2^31 plus all other 1 bits with +, so 2^30, 2^29... 2^3 + 2^0 = -71

### Numeric promotions rules
1. If two values have different data types, Java will automatically
promote one of the values to the larger of the two data types.
2. If one of the values is integral and the other is floating-point, Java will
automatically promote the integral value to the floating-point value’s
data type.
3. Smaller data types, namely, byte, short, and char, are first promoted
to int any time they’re used with a Java binary arithmetic operator
with a variable (as opposed to a value), even if neither of the operands
is int.
4. After all promotion has occurred and the operands have the same data
type, the resulting value will have the same data type as its promoted
operands.

*Note*: All values less then int (byte, char, short) is promoted to int.
So: 
```
short s1 = 12;
short s2 = 15;
var s3 = s1 + s2 // int 27 
```

When working with literals if it firs inside variable type it will compile ok.

### Compound Assignment Operators

+=, -=,*=, automatically performs casts for example
short += int  will automatically cast final result to short.

### InstanceOf
- InstanceOf null is always false. 
```
null instanceof str -> false

String a = null;
a instanceof String -> false
```

