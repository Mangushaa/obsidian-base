## Question 1

Which code can be inserted to have the code print 2?

Java

```
public class BirdSeed {
    private int numberBags;
    boolean call;
    
    public BirdSeed() {
        // LINE 1
        call = false;
        // LINE 2
    }
}

public BirdSeed(int numberBags) {
    this.numberBags = numberBags;
    
    public static void main(String[] args) {
        var seed = new BirdSeed();
        System.out.print(seed.numberBags);
    } 
}
```

- [ ] **A.** Replace line 1 with `BirdSeed(2);`
    
- [ ] **B.** Replace line 2 with `BirdSeed(2);`
    
- [ ] **C.** Replace line 1 with `new BirdSeed(2);`
    
- [ ] **D.** Replace line 2 with `new BirdSeed(2);`
    
- [ ] **E.** Replace line 1 with `this(2);`
    
- [ ] **F.** Replace line 2 with `this(2);`
    
- [ ] **G.** The code prints 2 without any changes.
    

## Question 2

Which modifier pairs can be used together in a method declaration? (Choose all that apply.)

- [ ] **A.** `static` and `final`
    
- [ ] **B.** `private` and `static`
    
- [ ] **C.** `static` and `abstract`
    
- [ ] **D.** `private` and `abstract`
    
- [ ] **E.** `abstract` and `final`
    
- [ ] **F.** `private` and `final`
    

## Question 3

Which of the following statements about methods are true? (Choose all that apply.)

- [ ] **A.** Overloaded methods must have the same signature.
    
- [ ] **B.** Overridden methods must have the same signature.
    
- [ ] **C.** Hidden methods must have the same signature.
    
- [ ] **D.** Overloaded methods must have the same return type.
    
- [ ] **E.** Overridden methods must have the same return type.
    
- [ ] **F.** Hidden methods must have the same return type.
    

## Question 4

What is the output of the following program?

Java

```
1: class Mammal {
2:     private void sneeze() {}
3:     public Mammal(int age) {
4:         System.out.print("Mammal");
5:     } 
6: }
7: public class Platypus extends Mammal {
8:     int sneeze() { return 1; }
9:     public Platypus() {
10:        System.out.print("Platypus");
11:    }
12:    public static void main(String[] args) {
13:        new Mammal(5);
14:    } 
15: }
```

- [ ] **A.** `Platypus`
    
- [ ] **B.** `Mammal`
    
- [ ] **C.** `PlatypusMammal`
    
- [ ] **D.** `MammalPlatypus`
    
- [ ] **E.** The code will compile if line 7 is changed.
    
- [ ] **F.** The code will compile if line 9 is changed.
    

## Question 5

Which of the following completes the constructor so that this code prints out 50?

Java

```
class Speedster {
    int numSpots;
}

public class Cheetah extends Speedster {
    int numSpots;
    
    public Cheetah(int numSpots) {
        // INSERT CODE HERE
    }
    
    public static void main(String[] args) {
        Speedster s = new Cheetah(50);
        System.out.print(s.numSpots);
    }
}
```

- [ ] **A.** `numSpots = numSpots;`
    
- [ ] **B.** `numSpots = this.numSpots;`
    
- [ ] **C.** `this.numSpots = numSpots;`
    
- [ ] **D.** `numSpots = super.numSpots;`
    
- [ ] **E.** `super.numSpots = numSpots;`
    
- [ ] **F.** The code does not compile regardless of the code inserted into the constructor.
    
- [ ] **G.** None of the above.
    

## Question 6

Which of the following declare immutable classes? (Choose all that apply.)

Java

```
public final class Moose {
    private final int antlers;
}

public class Caribou {
    private int antlers = 10;
}

public class Reindeer {
    private final int antlers = 5;
}

public final class Elk {}

public final class Deer {
    private final Object o = new Object();
}
```

- [ ] **A.** `Moose`
    
- [ ] **B.** `Caribou`
    
- [ ] **C.** `Reindeer`
    
- [ ] **D.** `Elk`
    
- [ ] **E.** `Deer`
    
- [ ] **F.** None of the above
    

## Question 7

What is the output of the following code?

Java

```
1: class Arthropod {
2:     protected void printName(long input) {
3:         System.out.print("Arthropod");
4:     }
5:     void printName(int input) {
6:         System.out.print("Spooky");
7:     } 
8: }
9: public class Spider extends Arthropod {
10:    protected void printName(int input) {
11:        System.out.print("Spider");
12:    }
13:    public static void main(String[] args) {
14:        Arthropod a = new Spider();
15:        a.printName((short)4);
16:        a.printName(4);
17:        a.printName(5L);
18:    } 
19: }
```

- [ ] **A.** `SpiderSpiderArthropod`
    
- [ ] **B.** `SpiderSpiderSpider`
    
- [ ] **C.** `SpiderSpookyArthropod`
    
- [ ] **D.** `SpookySpiderArthropod`
    
- [ ] **E.** The code will not compile because of line 5.
    
- [ ] **F.** The code will not compile because of line 9.
    
- [ ] **G.** None of the above.
    

## Question 8

What is the result of the following code?

Java

```
1: abstract class Bird {
2:     private final void fly() { System.out.println("Bird"); }
3:     protected Bird() { System.out.print("Wow-"); }
4: }
5: public class Pelican extends Bird {
6:     public Pelican() { System.out.print("Oh-"); }
7:     protected void fly() { System.out.println("Pelican"); }
8:     public static void main(String[] args) {
9:         var chirp = new Pelican();
10:        chirp.fly();
11:    } 
12: }
```

- [ ] **A.** `Oh-Bird`
    
- [ ] **B.** `Oh-Pelican`
    
- [ ] **C.** `Wow-Oh-Bird`
    
- [ ] **D.** `Wow-Oh-Pelican`
    
- [ ] **E.** The code contains a compilation error.
    
- [ ] **F.** None of the above.
    

## Question 9

Which of the following statements about overridden methods are true? (Choose all that apply.)

- [ ] **A.** An overridden method must contain method parameters that are the same or covariant with the method parameters in the inherited method.
    
- [ ] **B.** An overridden method may declare a new exception, provided it is not checked.
    
- [ ] **C.** An overridden method must be more accessible than the method in the parent class.
    
- [ ] **D.** An overridden method may declare a broader checked exception than the method in the parent class.
    
- [ ] **E.** If an inherited method returns `void`, then the overridden version of the method must return `void`.
    
- [ ] **F.** None of the above.
    

## Question 10

Which of the following pairs, when inserted into the blanks, allow the code to compile? (Choose all that apply.)

Java

```
1: public class Howler {
2:     public Howler(long shadow) {
3:         ____________;
4:     }
5:     private Howler(int moon) {
6:         super();
7:     }
8: }
9: class Wolf extends Howler {
10:    protected Wolf(String stars) {
11:        super(2L);
12:    }
13:    public Wolf() {
14:        _____________;
15:    }
16: }
```

- [ ] **A.** `this(3)` at line 3, `this("")` at line 14.
    
- [ ] **B.** `this()` at line 3, `super(1)` at line 14.
    
- [ ] **C.** `this((short)1)` at line 3, `this(null)` at line 14.
    
- [ ] **D.** `super()` at line 3, `super()` at line 14.
    
- [ ] **E.** `this(2L)` at line 3, `super((short)2)` at line 14.
    
- [ ] **F.** `this(5)` at line 3, `super(null)` at line 14.
    
- [ ] **G.** Remove lines 3 and 14.
    

## Question 11

What is the result of the following?

Java

```
1: public class PolarBear {
2:     StringBuilder value = new StringBuilder("t");
3:     { value.append("a"); }
4:     { value.append("c"); }
5:     private PolarBear() {
6:         value.append("b");
7:     }
8:     public PolarBear(String s) {
9:         this();
10:        value.append(s);
11:    }
12:    public PolarBear(CharSequence p) {
13:        value.append(p);
14:    }
15:    public static void main(String[] args) {
16:        Object bear = new PolarBear();
17:        bear = new PolarBear("f");
18:        System.out.println(((PolarBear)bear).value);
19:    } 
20: }
```

- [ ] **A.** `tacb`
    
- [ ] **B.** `tacf`
    
- [ ] **C.** `tacbf`
    
- [ ] **D.** `tcafb`
    
- [ ] **E.** `taftacb`
    
- [ ] **F.** The code does not compile.
    
- [ ] **G.** An exception is thrown.
    

## Question 12

How many lines of the following program contain a compilation error?

Java

```
1: public class Rodent {
2:     public Rodent(Integer x) {}
3:     protected static Integer chew() throws Exception {
4:         System.out.println("Rodent is chewing");
5:         return 1;
6:     }
7: }
8: class Beaver extends Rodent {
9:     public Number chew() throws RuntimeException {
10:        System.out.println("Beaver is chewing on wood");
11:        return 2;
12:    } 
13: }
```

- [ ] **A.** None
    
- [ ] **B.** 1
    
- [ ] **C.** 2
    
- [ ] **D.** 3
    
- [ ] **E.** 4
    
- [ ] **F.** 5
    

## Question 13

Which of these classes compile and will include a default constructor created by the compiler? (Choose all that apply.)

- [ ] **A.** ```java public class Bird {}
    
- [ ] **B.** ```java public class Bird { public bird() {} }
    
- [ ] **C.** ```java public class Bird { public bird(String name) {} }
    
- [ ] **D.** ```java public class Bird { public Bird() {} }
    
- [ ] **E.** ```java public class Bird { Bird(String name) {} }
    
- [ ] **F.** ```java public class Bird { private Bird(int age) {} }
    
- [ ] **G.** ```java public class Bird { public Bird bird() { return null; } }
    

## Question 14

Which of the following statements about inheritance are correct? (Choose all that apply.)

- [ ] **A.** A class can directly extend any number of classes.
    
- [ ] **B.** A class can implement any number of interfaces.
    
- [ ] **C.** All variables inherit `java.lang.Object`.
    
- [ ] **D.** If class A is extended by B, then B is a superclass of A.
    
- [ ] **E.** If class C implements interface D, then C is a subtype of D.
    
- [ ] **F.** Multiple inheritance is the property of a class to have multiple direct superclasses.
    

--- ## Question 15 Which statement about the following program is correct?

Java

```
1: abstract class Nocturnal {
2:     boolean isBlind();
3: }
4: public class Owl extends Nocturnal {
5:     public boolean isBlind() { return false; }
6:     public static void main(String[] args) {
7:         var nocturnal = (Nocturnal)new Owl();
8:         System.out.println(nocturnal.isBlind());
9:     } 
10: }
```

- [ ] **A.** It compiles and prints `true`.
    
- [ ] **B.** It compiles and prints `false`.
    
- [ ] **C.** The code will not compile because of line 2.
    
- [ ] **D.** The code will not compile because of line 5.
    
- [ ] **E.** The code will not compile because of line 7.
    
- [ ] **F.** The code will not compile because of line 8.
    
- [ ] **G.** None of the above.
    

## Question 16

What is the result of the following?

Java

```
1: class Arachnid {
2:     static StringBuilder sb = new StringBuilder();
3:     { sb.append("c"); }
4:     static { sb.append("u"); }
5:     { sb.append("r"); }
6: }
7: public class Scorpion extends Arachnid {
8:     static { sb.append("q"); }
9:     { sb.append("m"); }
10:    public static void main(String[] args) {
11:        System.out.print(Scorpion.sb + " ");
12:        System.out.print(Scorpion.sb + " ");
13:        new Arachnid();
14:        new Scorpion();
15:        System.out.print(Scorpion.sb);
16:    } 
17: }
```

- [ ] **A.** `qu qu qumrcrc`
    
- [ ] **B.** `u u ucrcrm`
    
- [ ] **C.** `uq uq uqmcrcr`
    
- [ ] **D.** `uq uq uqcrcrm`
    
- [ ] **E.** `qu qu qumcrcr`
    
- [ ] **F.** `qu qu qucrcrm`
    
- [ ] **G.** The code does not compile.
    

## Question 17

Which of the following are true? (Choose all that apply.)

- [ ] **A.** `this()` can be called from anywhere in a constructor.
    
- [ ] **B.** `this()` can be called from anywhere in an instance method.
    
- [ ] **C.** `this.variableName` can be called from any instance method in the class.
    
- [ ] **D.** `this.variableName` can be called from any static method in the class.
    
- [ ] **E.** You can call the default constructor written by the compiler using `this()`.
    
- [ ] **F.** You can access a private constructor with the `main()` method in the same class.
    

## Question 18

Which statements about the following classes are correct? (Choose all that apply.)

Java

```
1: public class Mammal {
2:     private void eat() {}
3:     protected static void drink() {}
4:     public Integer dance(String p) { return null; }
5: }
6: class Primate extends Mammal {
7:     public void eat(String p) {}
8: }
9: class Monkey extends Primate {
10:    public static void drink() throws RuntimeException {}
11:    public Number dance(CharSequence p) { return null; }
12:    public int eat(String p) {}
13: }
```

- [ ] **A.** The `eat()` method in Mammal is correctly overridden on line 7.
    
- [ ] **B.** The `eat()` method in Mammal is correctly overloaded on line 7.
    
- [ ] **C.** The `drink()` method in Mammal is correctly overridden on line 10.
    
- [ ] **D.** The `drink()` method in Mammal is correctly hidden on line 10.
    
- [ ] **E.** The `dance()` method in Mammal is correctly overridden on line 11.
    
- [ ] **F.** The `dance()` method in Mammal is correctly overloaded on line 11.
    
- [ ] **G.** The `eat()` method in Primate is correctly hidden on line 12.
    
- [ ] **H.** The `eat()` method in Primate is correctly overloaded on line 12.
    

## Question 19

What is the output of the following code?

Java

```
1: class Reptile {
2:     { System.out.print("A"); }
3:     public Reptile(int hatch) {}
4:     void layEggs() {
5:         System.out.print("Reptile");
6:     } 
7: }
8: public class Lizard extends Reptile {
9:     static { System.out.print("B"); }
10:    public Lizard(int hatch) {}
11:    public final void layEggs() {
12:        System.out.print("Lizard");
13:    }
14:    public static void main(String[] args) {
15:        var reptile = new Lizard(1);
16:        reptile.layEggs();
17:    } 
18: }
```

- [ ] **A.** `AALizard`
    
- [ ] **B.** `BALizard`
    
- [ ] **C.** `BLizardA`
    
- [ ] **D.** `ALizard`
    
- [ ] **E.** The code will not compile because of line 3.
    
- [ ] **F.** None of the above.
    

## Question 20

Which statement about the following program is correct?

Java

```
1: class Bird {
2:     int feathers = 0;
3:     Bird(int x) { this.feathers = x; }
4:     Bird fly() {
5:         return new Bird(1);
6:     } 
7: }
8: class Parrot extends Bird {
9:     protected Parrot(int y) { super(y); }
10:    protected Parrot fly() {
11:        return new Parrot(2);
12:    } 
13: }
14: public class Macaw extends Parrot {
15:    public Macaw(int z) { super(z); }
16:    public Macaw fly() {
17:        return new Macaw(3);
18:    }
19:    public static void main(String... sing) {
20:        Bird p = new Macaw(4);
21:        System.out.print(((Parrot)p.fly()).feathers);
22:    } 
23: }
```

- [ ] **A.** One line contains a compiler error.
    
- [ ] **B.** Two lines contain compiler errors.
    
- [ ] **C.** Three lines contain compiler errors.
    
- [ ] **D.** The code compiles but throws a `ClassCastException` at runtime.
    
- [ ] **E.** The program compiles and prints 3.
    
- [ ] **F.** The program compiles and prints 0.
    

## Question 21

Which of the following are properties of immutable classes? (Choose all that apply.)

- [ ] **A.** The class can contain setter methods, provided they are marked `final`.
    
- [ ] **B.** The class must not be able to be extended outside the class declaration.
    
- [ ] **C.** The class may not contain any instance variables.
    
- [ ] **D.** The class must be marked `static`.
    
- [ ] **E.** The class may not contain any static variables.
    
- [ ] **F.** The class may only contain private constructors.
    
- [ ] **G.** The data for mutable instance variables may be read, provided they cannot be modified by the caller.
    

## Question 22

What does the following program print?

Java

```
1: class Person {
2:     static String name;
3:     void setName(String q) { name = q; } 
4: }
5: public class Child extends Person {
6:     static String name;
7:     void setName(String w) { name = w; }
8:     public static void main(String[] p) {
9:         final Child m = new Child();
10:        final Person t = m;
11:        m.name = "Elysia";
12:        t.name = "Sophia";
13:        m.setName("Webby");
14:        t.setName("Olivia");
15:        System.out.println(m.name + " " + t.name);
16:    } 
17: }
```

- [ ] **A.** `Elysia Sophia`
    
- [ ] **B.** `Webby Olivia`
    
- [ ] **C.** `Olivia Olivia`
    
- [ ] **D.** `Olivia Sophia`
    
- [ ] **E.** The code does not compile.
    
- [ ] **F.** None of the above.
    

## Question 23

What is the output of the following program?

Java

```
1: class Canine {
2:     public Canine(boolean t) { logger.append("a"); }
3:     public Canine() { logger.append("q"); }
4:     private StringBuilder logger = new StringBuilder();
5:     protected void print(String v) { logger.append(v); }
6:     protected String view() { return logger.toString(); }
7: }
8: 
9: class Fox extends Canine {
10:    public Fox(long x) { print("p"); }
11:    public Fox(String name) {
12:        this(2);
13:        print("z");
14:    }
15: }
16: 
17: public class Fennec extends Fox {
18:    public Fennec(int e) {
19:        super("tails");
20:        print("j");
21:    }
22:    public Fennec(short f) {
23:        super("eevee");
24:        print("m");
25:    }
26: 
27:    public static void main(String... unused) {
28:        System.out.println(new Fennec(1).view());
29:    } 
30: }
```

- [ ] **A.** `qpz`
    
- [ ] **B.** `qpzj`
    
- [ ] **C.** `jzpa`
    
- [ ] **D.** `apj`
    
- [ ] **E.** `apjm`
    
- [ ] **F.** The code does not compile.
    
- [ ] **G.** None of the above.
    

## Question 24

What is printed by the following program?

Java

```
1: class Antelope {
2:     public Antelope(int p) {
3:         System.out.print("4");
4:     }
5:     { System.out.print("2"); }
6:     static { System.out.print("1"); }
7: }
8: public class Gazelle extends Antelope {
9:     public Gazelle(int p) {
10:        super(6);
11:        System.out.print("3");
12:    }
13:    public static void main(String hopping[]) {
14:        new Gazelle(0);
15:    }
16:    static { System.out.print("8"); }
17:    { System.out.print("9"); }
18: }
```

- [ ] **A.** `182640`
    
- [ ] **B.** `182943`
    
- [ ] **C.** `182493`
    
- [ ] **D.** `421389`
    
- [ ] **E.** The code does not compile.
    
- [ ] **F.** The output cannot be determined until runtime.
    

## Question 25

Which of the following are true about a concrete class? (Choose all that apply.)

- [ ] **A.** A concrete class can be declared as abstract.
    
- [ ] **B.** A concrete class must implement all inherited abstract methods.
    
- [ ] **C.** A concrete class can be marked as final.
    
- [ ] **D.** A concrete class must be immutable.
    
- [ ] **E.** A concrete method that implements an abstract method must match the method declaration of the abstract method exactly.
    

## Question 26

What is the output of the following code?

Java

```
4: public abstract class Whale {
5:     public abstract void dive();
6:     public static void main(String[] args) {
7:         Whale whale = new Orca();
8:         whale.dive(3);
9:     }
10: }
11: class Orca extends Whale {
12:     static public int MAX = 3;
13:     public void dive() {
14:         System.out.println("Orca diving");
15:     }
16:     public void dive(int... depth) {
17:         System.out.println("Orca diving deeper "+MAX);
18:     } 
19: }
```

- [ ] **A.** `Orca diving`
    
- [ ] **B.** `Orca diving deeper 3`
    
- [ ] **C.** The code will not compile because of line 4.
    
- [ ] **D.** The code will not compile because of line 8.
    
- [ ] **E.** The code will not compile because of line 11.
    
- [ ] **F.** The code will not compile because of line 12.
    
- [ ] **G.** The code will not compile because of line 17.
    
- [ ] **H.** None of the above.