
## General Info (Not needed for exam)

**NOTE:** Underhood Java uses a highly efficient mechanism introduced in Java 7 called `invokedynamic` (often abbreviated as **Indy**), combined with a recipe-based runtime approach.
When you write a lambda expression, the Java compiler (`javac`) doesn't create a new class. Instead, it **desugars** the body of the lambda into a private static (or instance) method inside your _existing_ class.

```
public class LambdaDemo {
    public void run() {
        Runnable r = () -> System.out.println("Hello from Lambda!");
        r.run();
    }
}
```
During compilation, `javac` strips the lambda body and turns it into a hidden method named something like `lambda$run$0`:
```
// What the compiler secretly generates inside LambdaDemo
private static synthetic void lambda$run$0() {
    System.out.println("Hello from Lambda!");
}
```

**Note:** If your lambda captures local variables (closures), those variables are passed as extra arguments to this generated method.

When a lambda captures variables or accepts parameters, the mechanism shifts slightly depending on whether the parameters are **passed into** the lambda during execution, or **captured from** the surrounding scope.

### Scenario 1: The Lambda Accepts Parameters (Normal Arguments)

If your lambda simply takes arguments (like a standard function), the process is straightforward.

Take this example using a `BiFunction`:

Java

```
BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;
int result = add.apply(5, 10);
```

### 1. Compile Time (Desugaring)

The compiler looks at the lambda body `a + b` and generates a hidden method that expects those two parameters:

Java

```
private static synthetic Integer lambda$main$0(Integer a, Integer b) {
    return a + b;
}
```

### 2. Runtime (The Proxy Class)

The `LambdaMetafactory` generates an in-memory class that implements `BiFunction`. Its `apply` method acts as a straight pass-through, forwarding the arguments directly to the generated method:

Java

```
// Conceptual view of what the JVM spins up in memory
final class LambdaProxy implements BiFunction {
    private LambdaProxy() {} // Singleton instance used if stateless

    @Override
    public Object apply(Object a, Object b) {
        // Forwards arguments straight to the desugared method
        return LambdaDemo.lambda$main$0((Integer) a, (Integer) b);
    }
}
```

Because no variables are captured from the outside world, this proxy class remains **stateless**. The JVM still creates just **one instance** of this proxy and reuses it every time.

### Scenario 2: The Lambda Captures Variables (Closures)

Things change when a lambda captures a local variable from its enclosing method. This is where the proxy class has to do some extra work.

Take this example:

Java

```
public void greet() {
    String prefix = "Hello, ";
    Consumer<String> greeter = (name) -> System.out.println(prefix + name);
    greeter.accept("Alice");
}
```

### 1. Compile Time (Desugaring)

Because the lambda needs `prefix`, the compiler adds `prefix` as the **first parameter** of the desugared method, followed by the lambda's actual arguments:

Java

```
// The compiler prepends the captured variable as an argument!
private static synthetic void lambda$greet$0(String prefix, String name) {
    System.out.println(prefix + name);
}
```

### 2. Runtime (The Proxy Class gets a Field)

Because the lambda needs to hold onto the state of `prefix`, `LambdaMetafactory` can no longer use a stateless singleton. It generates a proxy class with a **field** to store the captured variable, behaving like a constructor:

Java

```
// Conceptual view of the runtime-generated class for a capturing lambda
final class LambdaProxy implements Consumer {
    private final String capturedPrefix;

    // A constructor is generated to inject the captured variable
    public LambdaProxy(String prefix) {
        this.capturedPrefix = prefix;
    }

    @Override
    public void accept(Object name) {
        // Passes the stored field AND the method argument to the desugared method
        LambdaDemo.lambda$greet$0(this.capturedPrefix, (String) name);
    }
}
```

### The Performance Impact of Capturing

When the `invokedynamic` instruction executes in this scenario:

1. It calls the proxy's generated constructor: `new LambdaProxy(prefix)`.
    
2. A **new object instance** is allocated on the heap _every single time_ that line of code runs.
    

> ⚠️ **Note:** This is why Java enforces that captured variables must be **effectively final**. If the variable could change, the proxy class's field would become out of sync with the local variable on the stack frame.

Would you like to look at how this impacts garbage collection, or see the actual underlying bytecode for a capturing lambda?



## Lambdas for exam

```
var invalid = (Animal a) -> a.canHop(); // DOES NOT COMPILE since what interface lambda implements?
```

**NOTE:** If a functional interface includes an abstract method with the same signature as a public method found in Object, those methods do not count toward the single abstract method test. 

**NOTE:** Since Java assumes all classes extend from Object, you also cannot declare an interface method that is incompatible with Object. For example, declaring an abstract method int toString() in an interface would not compile since Object’s version of the method returns a
String.

```
public interface Soar {
   abstract String toString(); // Not functional interface since toString is from Object class
}

public interface Dive {
   String toString();
   public boolean equals(Object o);
   public abstract int hashCode();
   public void dive();
} // Functional interface since only 'dive' method is abstract, other 3 from Object
```

## Method Reference
- static methods
- Instance methods on a particular object
- Instance methods on a parameter to be determined at runtime
- Constructors

## Calling Instance Methods on a Parameter

So basically is referencing method is actually one param less then lambda expected params, that is will take first param as instance on which method will be executed. 

E.g 
```
Lambda declaration -> boolean check(String text, String prefix);
Referecing -> String::startsWith // Is not static referencing but instance referencing so will be transfered to ... text.startsWith(prefix)
```

```
interface StringParameterChecker {
   boolean check(String text);
}

23: StringParameterChecker methodRef = String::isEmpty;
24: StringParameterChecker lambda = s -> s.isEmpty();
25:
26: System.out.println(methodRef.check("Zoo")); // false

//Basically java takes takes lambda param and execute the method on it, instead of passig it as param to function.


--------------------------------------------------------------------------------


interface StringTwoParameterChecker {
   boolean check(String text, String prefix);
}

26: StringTwoParameterChecker methodRef = String::startsWith;
27: StringTwoParameterChecker lambda = (s, p) ->
s.startsWith(p);
28:
29: System.out.println(methodRef.check("Zoo", "A")); // false

// Same here it takes first param and execute method with second lambda param as param e.g (a, b) -> a.method(b)
```

## Using Convenience Methods on Functional Interfaces

Consumer.andThen(Consumer)

Function.andThen(Function), Function.compose(Function)
**NOTE:** in case of andThen functoins executed from left to right, in compose opposite.

Predicate.and(Predicate), Predicate.negate, Predicate.or(Predicate)

![[Pasted image 20260621232158.png]]


![[Pasted image 20260621232208.png]]


## Working with Variables in Lambdas

```
Predicate<String> p = x -> true;
Predicate<String> p = (var x) -> true;
Predicate<String> p = (String x) -> true;

// All works, basically same
```

**NOTE:** Since lambda parameters are just like method parameters, you can add modifiers to them. Specifically, you can add the final modifier or an annotation.

```
public void counts(List<Integer> list) {
   list.sort((final var x, @Deprecated var y) -> x.compareTo(y));
}
```

**NOTE:** You have three formats for specifying parameter types within a lambda: without types, with types, and with var. The compiler requires all parameters in the lambda to use the same format.

**NOTE:** Java doesn’t let you create a local variable with the same name as one already declared in that scope.

**NOTE:** lambda can access an instance variable, method parameter, or local variable under certain conditions. Instance variables (and class variables) are always allowed.