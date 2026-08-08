
**NOTE:** It's possible to extend Object class explicitly

**NOTE:** While you can only have one public top-level class, you can have as many classes (in any order) with package access as you want. In fact, you don’t even need to declare a public class!

**NOTE:** Trying to declare a top-level class with protected or private class will lead to a compiler error

**NOTE**: Same method param/variable name will always win against object field, so to access object field 'this' must  be used.

**NOTE:** private field can be accessed from static context in same class

```
public class TestInheritance extends Object {  
  
    private String privateField = "privateField";  
    String field1 = null;  
  
    void testMethod() {  
        String field1 = "Test";  
        System.out.println(field1);  
        System.out.println(this.field1);  
    }  
  
    public static void main(String[] args) {  
        TestInheritance testInheritance = new TestInheritance();  
        testInheritance.testMethod();  
        System.out.println(testInheritance.privateField);  // works fine
    }  
}
```


## Calling super

```
// Reptile.java
1: public class Reptile {
2:    protected int speed = 10;
3: }
// Crocodile.java
1: public class Crocodile extends Reptile {
2:    protected int speed = 20;
3:       public int getSpeed() {
4:       return speed;
5:    }
6:    public static void main(String[] data) {
7:       var croc = new Crocodile();
8:       System.out.println(croc.getSpeed()); // 20
9:    }
10: }
```

**NOTE:** One of the most important things to remember about this code is that an instance of Crocodile stores two separate values for speed: one at the Reptile level and one at the Crocodile level.

**NOTE:** You can reference parent field by 'this', but can't use 'super' when field is defined only in current class and not in parent

## Declaring constructors

**NOTE:** Default constructor is constructor witout params defined during compilation when explicitly no constructors defined. **IF EMPTY CONSTRUCTOR DEFINED EXPLICITLY ITS NOT 'DEFAULT'**

**NOTE:** Compiler only inserts the default constructor when no constructors are defined.

**NOTE:** When executing constructor from other constructor it should be first statement

```
3: public Hamster(int weight) {
4:    System.out.println("chew");
5:    // Set weight and default color
6:   this(weight, "brown"); // DOES NOT COMPILE
7: }
```

**NOTE:** If constructor executes itseft compiler will choose compilation error

```
public class Gopher {
   public Gopher(int dugHoles) {
      this(5); // DOES NOT COMPILE
   }
}
------------------------------------------------------------
// Also cycle constructor calling

public class Gopher {
   public Gopher() {
      this(5); // DOES NOT COMPILE
   }
   public Gopher(int dugHoles) {
     this(); // DOES NOT COMPILE
   }
}
```

- A class can contain many overloaded constructors, provided the
signature for each is distinct.
- The compiler inserts a default no-argument constructor if no
constructors are declared.
- If a constructor calls this(), then it must be the first line of the
constructor.
- Java does not allow cyclic constructor calls.

## Calling Parent Constructors with super()

**NOTE:** The first statement of every constructor is a call to a parent constructor using super() or another constructor in the class using this()

**NOTE:** Java compiler automatically inserts a call to the no-argument constructor super() if you do not explicitly call this() or super() as the first line of a constructor.

## Initializing Objects

```
public class MouseHouse {
   private final int volume;
   private final String type;
   {
      this.volume = 10;
   }
   public MouseHouse(String type) {
      this.type = type;
   }
   public MouseHouse() { // DOES NOT COMPILE since type will be not inited in this case
      this.volume = 2; // DOES NOT COMPILE
   }
}
```

Initialize Instance of X
1. Initialize Class X if it has not been previously initialized.
2. Initialize the superclass instance of X.
3. Process all instance variable declarations in the order in which they
appear in the class.
4. Process all instance initializers in the order in which they appear in the
class.
5. Initialize the constructor, including any overloaded constructors
referenced with this().


```
1: class GiraffeFamily {
2:    static { System.out.print("A"); }
3:    { System.out.print("B"); }
4:
5:    public GiraffeFamily(String name) {
6:       this(1);
7:       System.out.print("C");
8:    }
9:
10:    public GiraffeFamily() {
11:       System.out.print("D");
12:    }
13:
14:    public GiraffeFamily(int stripes) {
15:       System.out.print("E");
16:    }
17: }
18: public class Okapi extends GiraffeFamily {
19:    static { System.out.print("F"); }
20:
21:    public Okapi(int stripes) {
22:       super("sugar");
23:       System.out.print("G");
24:    }
25:    { System.out.print("H"); }
26:
27:    public static void main(String[] grass) {
28:       new Okapi(1);
29:       System.out.println();
30:       new Okapi(2);
31:    }
32: }
```

The program prints the following:
AFBECHG
BECHG

## Overriding a Method

1. The method in the child class must have the same signature as the
method in the parent class.
2. The method in the child class must be at least as accessible as the
method in the parent class.
3. The method in the child class may not declare a checked exception that
is new or broader than the class of any exception declared in the parent
class method.
4. If the method returns a value, it must be the same or a subtype of the
method in the parent class, known as covariant return types.

## Overriding with private

```
public class Beetle {  
    private String getSize() {  
        return "Undefined";  
    } 
}  
public class RhinocerosBeetle extends Beetle {  
    private int getSize() {  // Works, but if parent will change to public COMPILATION ERROR WILL BE
        return 5;  
    } 
}
```

## Hiding Static Methods

**NOTE:** The method defined in the child class must be marked as static if it is marked as static in a parent class. Same opposite if not static in parent, can not be static in child. Compilation error in other case.

## Hiding Variables

```
class Carnivore {
   protected boolean hasFur = false;
}

public class Meerkat extends Carnivore {
   protected boolean hasFur = true;
      public static void main(String[] args) {
      Meerkat m = new Meerkat();
      Carnivore c = m;
      System.out.println(m.hasFur); // true
      System.out.println(c.hasFur); // false
   }
}
```

## Writing final Methods

**NOTE:** By marking a method final, you forbid a child class from replacing this method. This
rule is in place both when you override a method and when you hide a method. In other words, you cannot hide a static method in a child class if it is marked final in the parent class.

## Abstact classes 

**NOTE:** The abstract modifier cannot be placed after the class keyword in a class declaration or after the return type in a method declaration.