```
private final void nap(int param1) throws Exception // method declaration
nap(int param1) // method signature
```

**NOTE:** Method name can not start from number, and be _

 **NOTE:** Access modifiers and optional specifiers can be applied in any order
 ```
 public class Exercise {
	public void bike1() {}
	public final void bike2() {}
	public static final void bike3() {}
	public final static void bike4() {}
	public modifier void bike5() {} // DOES NOT COMPILE
	public void final bike6() {} // DOES NOT COMPILE
	final public void bike7() {}
}
 ```
`
```
String hike8(int a) {
	if (1 < 2) return "orange"; // COMPILER WARNING
	return "apple"; 
}
```


**NOTE**: You can list as many types of exceptions as you want in this clause, separated by commas.

```
public void twoExceptions() throws IllegalArgumentException, InterruptedException {}
```


##### Local Variable Modifiers

**NOTE:** You can define final variable and not assighn value right after. But you should assign it before use. In case of instance variable you should use constructor

```
final int rest;
rest = 5 // Works fine
rest = 6 // Compile error
```


#### Instance variable modifiers

**NOTE:**  final, volatile, transient

#### Varargs

**NOTE:** 
- A method can have at most one varargs parameter.
- If a method contains a varargs parameter, it must be the last parameter in the list.

**NOTE:** You can pass in an array, or you can list the elements of the array and let Java create it for you. 

**NOTE:** You can even omit the varargs values in the method call, and Java will create an array of length zero for you.

**NOTE:** Java will create an empty array if no parameters are passed for a vararg. However, it is still possible to pass null explicitly.


#### Protected classes

In Java, a `protected` member (like your `field` variable or `method()` method) can be accessed in exactly two scenarios:

1. **Same Package:** Any class in the _same package_ as the declaring class can access it.
    
2. **Subclass:** A subclass in a _different package_ can access it, **but only through inheritance** (meaning the subclass can only access the protected member on an instance of itself, not on an instance of the superclass).

```
package a
class Bird {
	protected field;
	protected void method()
}

package b
class Swan extends Bird {
	test() {
		sout(field); // works
		method(); // works
	}
	
	test2() {
		Swan swan = new Swan();
		swan.method();
		swan.field(); // works fine same package;
	}
	
	test3() {
	   Bird bird = new Swan();
	   bird.field // do not compile since it's not subclass executing parent, and in diffirent package (BIRD REFERENCE!!!)
	   bird.method() // do not compile
	}
}

pckage b
class SwanWatcher {
	 test() {
	  Swan swan = new Swan();
	  swan.method(); Compilation error, method is accesible only same package as bird, or inside subclass through subclass reference.
	 }
}
```


## Accessing Static Data

**NOTE:** There can't be final volatile (it doesn't make sence);

**NOTE:** calling static field, method on null with not throw NPE.

#### Static Imports

The compiler will complain if you try to explicitly do a static import of two methods with the same name or two static variables with the same name.

```
import static zoo.A.TYPE;
import static zoo.B.TYPE; // DOES NOT COMPILE
```


## Passing Data among Methods

Think of an object in Java (like an array or a custom class) as a **Television** sitting in memory. The variable you use to interact with it is not the TV itself; it is a **Remote Control** (the reference) programmed to that specific TV.

When you pass an object into a method in Java, you do not hand over your remote control, nor do you copy the entire heavy TV. Instead, Java creates an **exact copy of your remote control** and hands _that_ to the method.

If Java actually supported **true passing by reference** (like C++ does), the "Television and Remote Control" analogy would play out completely differently.

Instead of creating a copy of your remote control, passing by reference means you hand over **the actual, original remote control** to the method.


## Autoboxing and Unboxing Variables

While Java will implicitly cast a smaller primitive to a larger type, as well as autobox, it will not do both at the same time. 

```
Long badGorilla = 8; // DOES NOT COMPILE
```

## Overloading Methods

Java picks the most specific version of a method that it can.

```
// Valid example of overloading
public class Kiwi {
   public void fly(int numMiles) {} // 1 order
   public void fly(Integer numMiles) {} // 2 order
   public void fly(int... numMiles) {} // 3 order
}
```

- **Exact Match (with Boxing/Unboxing):** It looks for an exact type match without doing any automatic conversions.
    
- **Widening:** It looks to see if it can convert the number to a larger type (e.g., turning an `int` into a `long`).
    
- **Varargs:** It checks methods that use variable arguments (`...`).


```  
// Compiles, but when executed can not determine

public static void walk(int... ints) {}  
public static void walk(Integer... integers) {}


// Forces Java to call the primitive int... method 
walk(new int[]{1, 2, 3}); 

// Forces Java to call the wrapper Integer... method 
walk(new Integer[]{1, 2, 3});

---------------------------------------------------------------

public class Toucan {
   public void fly(int[] lengths) {}
   public void fly(int… lengths) {} // DOES NOT COMPILE
}

```