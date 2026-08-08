## Implementing Interfaces

**NOTE:** You can explicitly set interface modifiers 'public', 'abstract'

```
public abstract interface WalksOnTwoLegs {}
```


## Inheriting Duplicate Abstract Methods

```
public interface Interface1 {  
    Number testMethod();  
}

public interface Interface2 {  
    Integer testMethod();  
}

public class Impl implements Interface1, Interface2 { // WORKS FINE!!!!  
    @Override  
    public Integer testMethod() {  
        return 0;  
    }  
}
```

```
public interface Herbivore { 
   public void eatPlants(int plantsLeft); 
}
public interface Omnivore { 
   public int eatPlants(int foodRemaining); 
}

public class Tiger implements Herbivore, Omnivore { // DOES NOT
COMPILE return type is not covariants
   // Doesn't matter!
}
```

## Inserting Implicit Modifiers

- Interfaces are implicitly abstract.
- Interface variables are implicitly public, static, and final.
- Interface methods without a body are implicitly abstract.
- Interface methods without the private modifier are implicitly public.

```
// Both declaretions are identical

public interface Soar {
   int MAX_HEIGHT = 10;
   final static boolean UNDERWATER = true;
   void fly(int speed);
   abstract void takeoff();
   public abstract double dive();
}

public abstract interface Soar {
   public static final int MAX_HEIGHT = 10;
   public final static boolean UNDERWATER = true;
   public abstract void fly(int speed);
   public abstract void takeoff();
   public abstract double dive();
}


public interface Dance {
   private int count = 4; // DOES NOT COMPILE
   protected void step(); // DOES NOT COMPILE
}
```

**NOTE:** Interfaces do not support protected members, as a class cannot extend an interface. They also do not support package access members, although more likely for syntax reasons and backward compatibility. Since interface methods without an access modifier have been
considered implicitly public, changing this behavior to package access would break many existing programs!

## Declaring Concrete Interface Methods

1. A default method may be declared only within an interface.
2. A default method must be marked with the default keyword and
include a method body.
3. A default method is implicitly public.
4. A default method cannot be marked abstract, final, or static.
5. A default method may be overridden by a class that implements the
interface.
6. If a class inherits two or more default methods with the same method
signature, then the class must override the method.

## Inheriting Duplicate default Methods
If the class implementing the interfaces overrides the duplicate default method, the code will compile without issue.

```
public interface Walk {
   public default int getSpeed() { return 5; }
}
public interface Run {
   public default int getSpeed() { return 10; }
}
public class Cat implements Walk, Run {} // DOES NOT COMPILE ambitious method

------------------------------------------------------------------------

public class Cat implements Walk, Run {
 
  public int getSpeed() {
     return 1;
  }
   public int getWalkSpeed() {
      return Walk.super.getSpeed();
   } 
}
```


## Declaring static Interface Methods

1. A static method must be marked with the static keyword and
include a method body.
2. A static method without an access modifier is implicitly public.
3. A static method cannot be marked abstract or final.
4. A static method is not inherited and cannot be accessed in a class
implementing the interface without a reference to the interface name.

```
public interface Hop {
   static int getJumpHeight() {
      return 8;
   } 
}

public class Bunny implements Hop {
   public void printDetails() {
      System.out.println(getJumpHeight()); // DOES NOT COMPILE Interface name should be added Hop.getJumpHeight();
   } 
}
```

## Reusing Code with private Interface Methods

1. A private interface method must be marked with the private
modifier and include a method body.
2. A private static interface method may be called by any method
within the interface definition.
3. A private interface method may only be called by default and other
private non-static methods within the interface definition.

```
public interface Schedule {
   default void wakeUp() { checkTime(7); }
   
   private void haveBreakfast() { checkTime(9); }
   
   static void workOut() { checkTime(18); }
   
   private static void checkTime(int hour) {
      if (hour > 17) {
         System.out.println("You’re late!");
       } else {
          System.out.println("You have "+(17-hour)+" hours left + "to make the appointment");
       }
   }
}
```


## Working with Enums

**NOTE:** We refer to an enum that only contains a list of values as a simple enum. When working with simple enums, the semicolon at the end of the list is optional.


**NOTE:** One thing that you can’t do is extend an enum.

```
public enum ExtendedSeason extends Season {} // DOES NOT COMPILE
```

```
Season s = Season.valueOf("SUMMER"); // SUMMER
Season t = Season.valueOf("summer"); // IllegalArgumentException
```

```
String getWeather(Season value) {
   return switch (value) {
      case SUMMER -> "Too hot";
      case 0 -> "Too cold"; // DOES NOT COMPILE
      default -> "Just right";
   };
}
```


**NOTE:** Complex enums - enums with logic except enum values. It can implement interfaces, have fields, and methods, both static and not.

**NOTE:**  In fact, an enum constructor will not compile if it contains a public or protected modifier. Only private is allowed. All enums instances constructered as soon when enum is loaded (first time any instance accessed).

**NOTE:** Sometimes you want to define different methods for each enum.
```
public enum SeasonWithTimes {
   WINTER {
      public String getHours() { return "10am-3pm"; }
   },
   SPRING {
      public String getHours() { return "9am-5pm"; }
   },
   SUMMER {
      public String getHours() { return "9am-7pm"; }
   },
   FALL {
      public String getHours() { return "9am-5pm"; }
   };

   public abstract String getHours();
}
```
Additionally we can implement getHours() in first place, and override only for enums where it's needed.


## Sealing Classes
**NOTE:** 'sealed' keyword should be before 'class'

**NOTE:** Every class that directly extends a sealed class must specify exactly one of the following three modifiers: final, sealed, or non-sealed. 

**NOTE:** in case of not using java modules, sealled parents and childs should be in same package. (it prevents of atacked to 

## Omitting the permits Clause

**NOTE:** Permits cause can be ommited if both parent and child in same java file, or child is nested.

**NOTE:** In case of nested class we should reference outer namespace 

```
public sealed class Snake permits Cobra { // DOES NOT COMPILE
	final class Cobra extends Snake {}
}

public sealed class Snake permits Snake.Cobra {
	final class Cobra extends Snake {}
}
```

## Sealing Interfaces

**NOTE:** One distinct feature of a sealed interface over class is that the permits list can apply to a class that implements the interface or an interface that extends the interface.

```
// Sealed interface
public sealed interface Swims permits Duck, Swan, Floats {}

// Classes permitted to implement sealed interface
public final class Duck implements Swims {}

public final class Swan implements Swims {}

// Interface permitted to extend sealed interface
public non-sealed interface Floats extends Swims {}
```

## Applying Pattern Matching to a Sealed Class

```
abstract sealed class Fish permits Trout, Bass {}
final class Trout extends Fish {}
final class Bass extends Fish {}

We can define a switch expression that does not require a default clause:

public String getType(Fish fish) {
   return switch (fish) {
      case Trout t -> "Trout!";
      case Bass b -> "Bass!";
   };
}
```

## Reviewing Sealed Class Rules

- Sealed classes are declared with the sealed and permits modifiers.
- Sealed classes must be declared in the same package or named module
  as their direct subclasses.
- Direct subclasses of sealed classes must be marked final, sealed, or
  non-sealed. For interfaces that extend a sealed interface, only sealed
  and non-sealed modifiers are permitted.
- The permits clause is optional if the sealed class and its direct
  subclasses are declared within the same file or the subclasses are
  nested within the sealed class.
- Interfaces can be sealed to limit the classes that implement them or the
  interfaces that extend them.

## Records

**NOTE:** If we insert constructor that match default constructor that compiler will generate by default (it's called long constructor), it will not generate one.

**NOTE:** Since each field is final, the constructor must set every field.

**NOTE**: If we want to add custom init without passing each param we can use compace constructor 
```
public record User(String name) { 
   public User { 
      if (name == null || name.isBlank()) { 
         throw new IllegalArgumentException("Name cannot be blank"); 
      } 
    } 
}
```


**NOTE:**  While compact constructors can modify the constructor parameters, they cannot modify the fields of the record. 

```
public record Crane(int numberEggs, String name) {
   public Crane {
      this.numberEggs = 10; // DOES NOT COMPILE
   }
}
```

**NOTE:** In a Java record, any overloaded (alternate) constructor **must explicitly delegate** to another constructor using `this(...)` on the very first line. Ultimately, the chain of constructor calls _must_ end up calling the **canonical constructor** (the "long" one that matches the record's header).

**NOTE:** records are implicitly final.  You can’t extend or inherit a record.

**NOTE:**. While instance members of a record are final, the static members are not required to be. 


## Using Pattern Matching with Records

```
record Monkey(String name, int age) {}

public class Zoo {
    public static void main(String[] args) {

        Object animal = new Monkey("George", 3);

        if (animal instanceof Monkey(String name, int myAge)) {
            System.out.println("Hello " + name);
            System.out.println("Your age is " + myAge);
        }
    }
}
```

- If any field declared in the record is included, then all fields must be included. 
- The order of fields must be the same as in the record.
- The names of the fields do not have to match.
- At compile time, the type of the field must be compatible with the type declared in the record.
- The pattern may not match at runtime if the record supports elements of various types.


```
if(animal instanceof Monkey myMonkey) {} // compiles, default pattern matching, not record specific

if(animal instanceof Monkey(String n, int a) myMonkey) {} // do not compiles if using record matching (passing fields) can not use default mathing

if(animal instanceof Monkey(String n, long a)) {} // do not compile, numeric promotion not supported

if(animal instanceof Monkey(Object n, int a)) {} // Compiles covariants works file
```


**NOTE:** Pattern matching for records include matching both the type of the record and the type of each field.

```
record Fish(Object type) {}
public class Veterinarian {
    public static void main(String[] args) {
        Fish f1 = new Fish("Nemo");
        Fish f2 = new Fish(Integer.valueOf(1));

        if(f1 instanceof Fish(Object t)) {
            System.out.print("Match1-");
        }
        if(f1 instanceof Fish(String t)) {
            System.out.print("Match2-");
        }
        if(f1 instanceof Fish(Integer t)) {
            System.out.print("Match3-");
        }
        if(f2 instanceof Fish(String t)) {
            System.out.print("Match4-");
        }
        if(f2 instanceof Fish(Integer x)) {
            System.out.print("Match5");
        }
    } }
    
// If we change record to record Fish(Integer type) {} match field to string will not compile. 
```
This compiles output 'Match1-Match2-Match5'


## Nesting Record Patterns

```
record Bear(String name, List<String> favoriteThings) {}
record Couple(Bear a, Bear b) {}

var c = new Couple(new Bear("Yogi", List.of("PicnicBaskets")),
new Bear("Fozzie", List.of("BadJokes")));

if(c instanceof Couple(Bear a, Bear b)) {
   System.out.print(a.name() + " " + b.name());
}
if(c instanceof Couple(Bear(String firstName, List<String> f), Bear b)) {
   System.out.print(firstName + " " + b.name());
}
if(c instanceof Couple(Bear(String name, List<String> f1),
Bear(String name, List<String> f2))) {
   System.out.print(name + " " + name);
}
```

The first pattern matching statement compiles and uses Couple without expanding the nested Bear records. The second example expands the first Bear record, making firstName and b local variables within the pattern matching statement. The third pattern matching statement does not compile. Although you can expand both records, you have to give them distinct names. We can fix this, though, by expanding the nested types to have unique names.

## Matching Records with var and Generics

```
var c = new Couple(new Bear("Yogi", List.of("PicnicBaskets")),
new Bear("Fozzie", List.of("BadJokes")));
if (c instanceof Couple(var a, var b)) {
   System.out.print(a.name() + " " + b.name());
}

if (c instanceof Couple(Bear(var firstName, List<String> f), var b)) {
   System.out.print(firstName + " " + b.name());
}
```

As you can see, you can replace any element reference type with var. When var is used for one of the elements of the record, the compiler assumes the type to be the exact match for the type in the record.

```
if(c instanceof Couple(Bear(var n, Object f),
var b)) {}
if(c instanceof Couple(Bear(var n, List f),
var b)) {}
if(c instanceof Couple(Bear(var n, List<?> f),
var b)) {}
if(c instanceof Couple(Bear(var n, List<? extends Object> f),
var b)) {}
if(c instanceof Couple(Bear(var n, ArrayList<String> f),
var b)) {}

if(c instanceof Couple(Bear(var n, List<> f), var b)) {} // Does not compile <> can't be used in pattern matching

if(c instanceof Couple(Bear(var n, List<Object> f), var b)) {} // Does not compile List<Object> != List<String>
```

## Applying Pattern Matching Records to Switch

```
record Snake(Object data) {}

long showData(Snake snake) {
   return switch(snake) {
      case Snake(Long hiss) -> hiss + 1;
      case Snake(Integer nagina) -> nagina + 10;
      case Snake(Number crowley) -> crowley.intValue() + 100;
      case Snake(Object kaa) -> -1;
   };
}
```

## Customizing Records

Records can include:

- Overloaded and compact constructors
- Instance methods including overriding any provided methods (accessors, equals(), hashCode(), toString())
- Nested classes, interfaces, annotations, enums, and records

**NOTE:** While you can add methods, static fields, and other data types, you cannot add instance fields outside the record declaration, even if they are private and final. Doing so defeats the purpose of using a record and could break immutability!

**NOTE:** Records also do not support instance initializers. All initialization for the
fields of a record must happen in a constructor. They do support static
initializers, though. 

## Creating Nested Classes

**NOTE:** Java compiles inner classes to separate class file OuterClass$InnerClass.class

Because they are not top-level types, they can use any of the four access levels, not just public and package access.

Inner classes have the following properties:
- Can be declared public, protected, package, or private
- Can extend a class and implement interfaces
- Can be marked abstract or final
- Can access members of the outer class, including private members

## Instantiating an Instance of an Inner Class

```
public class Home {
    private String greeting = "Hi";  // Outer class instance variable
    
    protected class Room {           // Inner class declaration
        public int repeat = 3;
        public void enter() {
            for (int i = 0; i < repeat; i++) greet(greeting);
        }
        private static void greet(String message) {
            System.out.println(message);
        }
    }
    
    public void enterRoom() {        // Instance method in outer class
        var room = new Room();       // Create the inner class instance
        room.enter();
    }
    public static void main(String[] args) {
        var home = new Home();       // Create the outer class instance
        home.enterRoom();
    } }
```

```
public static void main(String[] args) {
   var home = new Home();
   Room room = home.new Room(); // Create the inner class instance
   room.enter();
}

new Home().new Room().enter(); // Sorry, it looksugly to us too, but it works
```

## Referencing Members of an Inner Class

```
public class A {
    private int x = 10;
    class B {
        private int x = 20;
        class C {
            private int x = 30;
            public void allTheX() {
                System.out.println(x);         // 30
                System.out.println(this.x);    // 30
                System.out.println(B.this.x);  // 20
                System.out.println(A.this.x);  // 10
            }
        }
    }
    public static void main(String[] args) {
        A a = new A();
        A.B b = a.new B();
        A.B.C c = b.new C();
        c.allTheX();
    }
}
```

## Creating a static Nested Class
Unlike an inner class, a static nested class can be instantiated without an instance of the enclosing class. The trade-off, though, is that it can’t access instance variables or methods declared in the outer class.

**NOTE:** The enclosing class can refer to the fields and methods of the static nested class.

```
public class Park {
   static class Ride {
      private int price = 6;
   } 
   public static void main(String[] args) {
	  var ride = new Ride();
	  System.out.println(ride.price);
   } 
}
```


**NOTE:** Nested Records are Implicitly static


## Writing a Local Class

Local classes have the following properties:

- Do not have an access modifier.
- Can be declared final or abstract.
- Can include instance and static members.
- Have access to all fields and methods of the enclosing class (when defined in an instance method).
- Can access final and effectively final local variables.

```
public void processData() {
   final int length = 5;
   int width = 10;
   int height = 2;
   class VolumeCalculator {
      public int multiply() {
         return length * width * height; // DOES NOT COMPILE
      }
   }
   width = 2;
}
```
The length and height variables are final and effectively final, respectively, so neither causes a compilation issue. On the other hand, the width variable is reassigned during the method, so it cannot be effectively final. For this reason, the local class declaration does not compile.

## Defining an Anonymous Class

```
public class Gorilla {
interface Climb {}
Climb climbing = new Climb() {}; // works fine 
}
```
![[Pasted image 20260621020002.png]]

![[Pasted image 20260621020056.png]]

## Understanding Polymorphism


## Casting Interfaces

```
interface Canine {}
interface Dog {}
class Wolf implements Canine {}

public class BadCasts {
   public static void main(String[] args) {
      Wolf wolfy = new Wolf();
      Dog badWolf = (Dog)wolfy;
   } 
}

// if final class Wolf implements Canine {} then compiler errpr is thrown
```

In this program, a Wolf object is created and then assigned to a Wolf reference type on line 7. With interfaces, the compiler has limited ability to enforce many rules because even though a reference type may not implement an interface, one of its subclasses could. Therefore, it allows the invalid cast to the Dog reference type on line 8, even though Dog and Wolf are not related. Fear not, even though the code compiles, it still throws a ClassCastException at runtime.
This limitation aside, the compiler can enforce one rule around interface casting. The compiler does not allow a cast from an interface reference to an object reference if the object type cannot possibly implement the interface, such as if the class is marked final.

## Overriding vs. Hiding Members
```
class Penguin {
   public static int getHeight() { return 3; }
   public void printInfo() {
      System.out.println(this.getHeight());
   } 
}

public class CrestedPenguin extends Penguin {
   public static int getHeight() { return 8; }
   public static void main(String… fish) {
     new CrestedPenguin().printInfo(); // prints 3 from parent
   } 
}
```

```
class Marsupial {
   protected int age = 2;
   public static boolean isBiped() {
      return false;
   } 
}

public class Kangaroo extends Marsupial {
   protected int age = 6;
   public static boolean isBiped() {
      return true;
   }
   
   public static void main(String[] args) {
      Kangaroo joey = new Kangaroo();
	  Marsupial moey = joey;
      System.out.println(joey.isBiped());
      System.out.println(moey.isBiped());
      System.out.println(joey.age);
      System.out.println(moey.age);
      // true false 6 2
   } 
}
```