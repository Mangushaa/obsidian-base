### Class

- Only one outer public class is available in file and it should match file name. We could have any number of other outer classes in same file with diffirent name, but not public.
- psvm main method should single String[] param but name can be anthing e.g String[] args (default), String[] marko, String[] anything
- We can also add final to main method and it's param. e.g public static final void main (final String[] args).
- CONSTRUCTOR CAN NOT HAVE RETURN TYPE, otherway it's not constructor but just method, and it will compile.


### Running Java Program
- Single source file - if you want to run single file you can omit javac command and directly type.  
```
java Zoo.java Bronx Zoo
```
There is a key difference here. When compiling first, you omitted the file extension
when running java. When skipping the explicit compilation step, you include this
extension. This feature is called launching single-file source-code programs and is
useful for testing or for small programs.

### Package declaration and imports
- All calsses in java.lang imported implicitly (e.g java.lang.String)
- Naming rules for package same as for variable
- The import statement doesn’t bring in child packages, fields, or methods; it imports only classes directly under the package.
  Let’s say you wanted to use the class AtomicInteger in the java.util.concurrent.atomic package. Which import or imports support this?

```
import java.util.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.*;
```
   Only the last import allows the class to be recognized because child packages are not
   included with the first two.
   
- **Naming Conflicts** 
 ```
import java.util.*;
import java.sql.*; // causes Date declaration to not compile
 ...
 Date date;
 ```
 To solve we can:

Directly import (without wildcard) one of Date class e.g
 ```
import java.util.Date;
import java.sql.*;
 ```

Use full class name 
```
public class Conflicts {
  java.util.Date date;
  java.sql.Date sqlDate;
}
```

### Data types
- Boollean.valueOf -> when passing "true" case insensative will return boolean true. For any other false. "trUe" -> true, "tru" -> false, null -> false
- Integer.valueOf("str", base) -> Integer.valueOf("a", 16) -> 15, Integer.valueOf("07", 8) -> 8


### Defining text blocks
PRACTICE!!!! Check on IDEA



### Var Variables
- Var can only be used for local vars, not instance vars.
```
4: public void twoTypes() {
5: int a, var b = 3; // DOES NOT COMPILE
6: var a, b = 3; // DOES NOT COMPILE
7: var n = null; // DOES NOT COMPILE
8: }
```
- There’s one last rule you should be aware of: var is not a reserved word and allowed to be used as an identifier. It is considered a reserved type name. A reserved type name means it cannot be used to define a type, such as a class, interface, or enum. 