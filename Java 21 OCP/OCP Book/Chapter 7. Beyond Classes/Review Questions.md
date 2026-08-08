### 1. Which of the following are valid record declarations? (Choose all that apply.)

Java

```
public record Iguana(int age) {
    private static final int age = 10; 
}
public final record Gecko() {}
public abstract record Chameleon() {
    private static String name; 
}
public record BeardedDragon(boolean fun) {
    @Override public boolean fun() { return false; } 
}
public record Reptile(long size) {
    public Reptile {
        if(size == 1) throw new IllegalArgumentException();
    } 
}
public record Newt(double age) extends Reptile {
    public Newt(double age) {
        age = this.age % 2 == 0 ? 5 : 10;
    } 
}
```

- [ ] A. Iguana
    
- [ ] B. Gecko
    
- [ ] C. Chameleon
    
- [ ] D. BeardedDragon
    
- [ ] E. Reptile
    
- [ ] F. Newt
    
- [ ] G. None of the above
    

### 2. Which of the following statements can be inserted in the blank line so that the code will compile successfully? (Choose all that apply.)

Java

```
interface CanHop {}
public class Frog implements CanHop {
    public static void main(String[] args) {
        ____________ frog = new TurtleFrog();
    }
}
class BrazilianHornedFrog extends Frog {}
class TurtleFrog extends Frog {}
```

- [ ] A. Frog
    
- [ ] B. TurtleFrog
    
- [ ] C. BrazilianHornedFrog
    
- [ ] D. CanHop
    
- [ ] E. var
    
- [ ] F. Long
    
- [ ] G. None of the above; the code contains a compilation error.
    

### 3. What is the result of the following program?

Java

```
11: public class Favorites {
12:   enum Flavors {
13:     VANILLA, CHOCOLATE, STRAWBERRY
14:     public Flavors() {}
15:   }
16: 
17:   public static void main(String[] args) {
18:     for(final var e : Flavors.values())
            System.out.print((e.ordinal() % 2) + " ");
19:   } 
20: }
```

- [ ] A. 0 1 0
    
- [ ] B. 1 0 1
    
- [ ] C. Exactly one line of code does not compile.
    
- [ ] D. More than one line of code does not compile.
    
- [ ] E. The code compiles but produces an exception at runtime.
    
- [ ] F. None of the above.
    

### 4. What is the output of the following program?

Java

```
public sealed class ArmoredAnimal permits Armadillo {
    public ArmoredAnimal(int size) {}
    @Override public String toString() { return "Strong"; }
    public static void main(String[] a) {
        var c = new Armadillo(10, null);
        System.out.println(c);
    }
}
class Armadillo extends ArmoredAnimal {
    @Override public String toString() { return "Cute"; }
    public Armadillo(int size, String name) {
        super(size);
    }
}
```

- [ ] A. Strong
    
- [ ] B. Cute
    
- [ ] C. The program does not compile.
    
- [ ] D. The code compiles but produces an exception at runtime.
    
- [ ] E. None of the above.
    

### 5. Which statement about the following program is correct?

Java

```
1: interface HasExoskeleton {
2:     double size = 2.0f;
3:     abstract int getNumberOfSections();
4: }
5: abstract class Insect implements HasExoskeleton {
6:     abstract int getNumberOfLegs();
7: }
8: public class Beetle extends Insect {
9:     int getNumberOfLegs() { return 6; }
10:    int getNumberOfSections(int count) { return 1; }
11: }
```

- [ ] A. It compiles without issue.
    
- [ ] B. The code will produce a ClassCastException if called at runtime.
    
- [ ] C. The code will not compile because of line 2.
    
- [ ] D. The code will not compile because of line 5.
    
- [ ] E. The code will not compile because of line 8.
    
- [ ] F. The code will not compile because of line 10.
    

### 6. Which statements about the following program are correct? (Choose all that apply.)

Java

```
1: public abstract interface Herbivore {
2:     int amount = 10;
3:     public void eatGrass();
4:     public abstract int chew() { return 13; }
5: }
6: 
7: abstract class IsAPlant extends Herbivore {
8:     Object eatGrass(int season) { return null; }
9: }
```

- [ ] A. It compiles and runs without issue.
    
- [ ] B. The code will not compile because of line 1.
    
- [ ] C. The code will not compile because of line 2.
    
- [ ] D. The code will not compile because of line 4.
    
- [ ] E. The code will not compile because of line 7.
    
- [ ] F. The code will not compile because line 8 contains an invalid method override.
    

### 7. What is the output of the following program?

Java

```
1: interface Aquatic {
2:     int getNumOfGills(int p);
3: }
4: public class ClownFish implements Aquatic {
5:     String getNumOfGills() { return "14"; }
6:     int getNumOfGills(int input) { return 15; }
7:     public static void main(String[] args) {
8:         System.out.println(new ClownFish().getNumOfGills(-1));
9:     } 
10: }
```

- [ ] A. 14
    
- [ ] B. 15
    
- [ ] C. The code will not compile because of line 4.
    
- [ ] D. The code will not compile because of line 5.
    
- [ ] E. The code will not compile because of line 6.
    
- [ ] F. None of the above.
    

### 8. Given the following, select the statements that can be inserted into the blank line so that the code will compile and print true at runtime? (Choose all that apply.)

- [ ] A. Exhibit(Walrus(List z), Object a)
    
- [ ] B. Exhibit(Walrus(List m), Object n)
    
- [ ] C. Object w && w.animal().diet().size() == 0
    
- [ ] D. Exhibit(Walrus(var i), var i)
    
- [ ] E. Exhibit(var p, var q)
    
- [ ] F. Exhibit(List<'?'> g, var h)
    
- [ ] G. Exhibit(var x, CharSequence y)
    
- [ ] H. Exhibit(Walrus(null), var v)
    

### 9. Which of the following statements can be inserted in the blank so that the code will compile successfully? (Choose all that apply.)

Java

```
abstract class Snake {}
class Cobra extends Snake {}
class GardenSnake extends Cobra {}

public class SnakeHandler {
    private Snake snakey;
    public void setSnake(Snake mySnake) { this.snakey = mySnake; }
    public static void main(String[] args) {
        new SnakeHandler().setSnake(_____________);
    } 
}
```

- [ ] A. new Cobra()
    
- [ ] B. new Snake()
    
- [ ] C. new Object()
    
- [ ] D. new String("Snake")
    
- [ ] E. new GardenSnake()
    
- [ ] F. null
    
- [ ] G. None of the above. The class does not compile, regardless of the value inserted in the blank.
    

### 10. What types can be inserted in the blanks on the lines marked X and Z that allow the code to compile? (Choose all that apply.)

Java

```
interface Walk { private static List move() { return null; } }
interface Run extends Walk { public ArrayList move(); }

class Leopard implements Walk {
    public ___________ move() { // X
        return null;
    }
}
class Panther implements Run {
    public move(___________) { // Z
        return null;
    }
}
```

- [ ] A. Integer on the line marked X
    
- [ ] B. ArrayList on the line marked X
    
- [ ] C. List on the line marked X
    
- [ ] D. List on the line marked Z
    
- [ ] E. ArrayList on the line marked Z
    
- [ ] F. None of the above, since the Run interface does not compile.
    
- [ ] G. Does not compile for a different reason.
    

### 11. What is the result of compiling and executing the following code?

Java

```
1: public class Movie {
2:     private int butter = 5;
3:     private Movie() {}
4:     protected class Popcorn {
5:         private Popcorn() {}
6:         public static int butter = 10;
7:         public void startMovie() {
8:             System.out.println(butter);
9:         }
10:    }
11:    public static void main(String[] args) {
12:        var movie = new Movie();
13:        Movie.Popcorn in = new Movie().new Popcorn();
14:        in.startMovie();
15:    } 
16: }
```

- [ ] A. The output is 5.
    
- [ ] B. The output is 10.
    
- [ ] C. Line 6 generates a compiler error.
    
- [ ] D. Line 12 generates a compiler error.
    
- [ ] E. Line 13 generates a compiler error.
    
- [ ] F. The code compiles but produces an exception at runtime.
    

### 12. Which variables or members are accessible from within the hiss() method? (Choose all that apply.)

Java

```
13: public class BoaConstrictor {
14:     private Body body;
15:     BoaConstrictor(Body b) { this.body = b; }
16:     private long tail = 10;
17:     record Body(int stripes) {
18:         private static int counter = 0;
19:         int counter() { return counter; }
20:         Body {
21:             stripes = stripes + counter++;
22:         }
23:         private void hiss() {} 
24:     } 
25: }
```

- [ ] A. counter()
    
- [ ] B. tail
    
- [ ] C. body
    
- [ ] D. stripes()
    
- [ ] E. stripes
    
- [ ] F. counter
    
- [ ] G. Line 15 does not compile.
    
- [ ] H. Line 17 does not compile.
    
- [ ] I. Lines 20–22 do not compile.
    

### 13. What is the result of the following program?

Java

```
public class Weather {
    enum Seasons {
        WINTER, SPRING, SUMMER, FALL
    }
    public static void main(String[] args) {
        Seasons v = null;
        switch (v) {
            case Seasons.SPRING -> System.out.print("s");
            case Seasons.WINTER -> System.out.print("w");
            case Seasons.SUMMER -> System.out.print("m");
            default -> System.out.println("missing data"); 
        }
    } 
}
```

- [ ] A. s
    
- [ ] B. w
    
- [ ] C. m
    
- [ ] D. missing data
    
- [ ] E. Exactly one line of code does not compile.
    
- [ ] F. More than one line of code does not compile.
    
- [ ] G. The code compiles but produces an exception at runtime.
    

### 14. Which statements about sealed classes are correct? (Choose all that apply.)

- [ ] A. A sealed interface restricts which subinterfaces may extend it.
    
- [ ] B. A sealed class cannot be indirectly extended by a class that is not listed in its permits clause.
    
- [ ] C. A sealed class can be extended by an abstract class.
    
- [ ] D. A sealed class can be extended by a subclass that uses the nonsealed modifier.
    
- [ ] E. A sealed interface restricts which subclasses may implement it.
    
- [ ] F. A sealed class cannot contain any nested subclasses.
    
- [ ] G. None of the above.
    

### 15. Which line allows the code to print Not scared at runtime?

Java

```
public class Ghost {
    public static void boo() {
        System.out.println("Not scared");
    }
    protected final class Spirit {
        public void boo() {
            System.out.println("Booo!!!");
        }
    }
    public static void main(String... haunt) {
        var g = new Ghost().new Spirit() {};
        _______________________________;
    } 
}
```

- [ ] A. g.boo()
    
- [ ] B. g.super.boo()
    
- [ ] C. new Ghost().boo()
    
- [ ] D. g.Ghost.boo()
    
- [ ] E. new Spirit().boo()
    
- [ ] F. None of the above
    

### 16. The following code appears in a file named Ostrich.java. What is the result of compiling the source file?

Java

```
1: public class Ostrich {
2:     private int count;
3:     static class OstrichWrangler {
4:         public int stampede() {
5:             return count;
6:         } 
7:     } 
8: }
```

- [ ] A. The code compiles successfully, and one bytecode file is generated: Ostrich.class.
    
- [ ] B. The code compiles successfully, and two bytecode files are generated: Ostrich.class and OstrichWrangler.class.
    
- [ ] C. The code compiles successfully, and two bytecode files are generated: Ostrich.class and Ostrich$OstrichWrangler.class.
    
- [ ] D. A compiler error occurs on line 3.
    
- [ ] E. A compiler error occurs on line 5.
    

### 17. Which lines of the following interface declarations do not compile? (Choose all that apply.)

Java

```
1: public interface Omnivore {
2:     int amount = 10;
3:     static boolean gather = true;
4:     static void eatGrass() {}
5:     int findMore() { return 2; }
6:     default float rest() { return 2; }
7:     protected int chew() { return 13; }
8:     private static void eatLeaves() {}
9: }
```

- [ ] A. All of the lines compile without issue.
    
- [ ] B. Line 2.
    
- [ ] C. Line 3.
    
- [ ] D. Line 4.
    
- [ ] E. Line 5.
    
- [ ] F. Line 6.
    
- [ ] G. Line 7.
    
- [ ] H. Line 8.
    

### 18. What is printed by the following program?

Java

```
public class Deer {
    enum Food {APPLES, BERRIES, GRASS}
    protected class Diet {
        private Food getFavorite() {
            return Food.BERRIES;
        }
    }
    public static void main(String[] seasons) {
        System.out.print(switch(new Diet().getFavorite()) {
            case APPLES -> "a";
            case BERRIES -> "b";
            default -> "c";
        });
    } 
}
```

- [ ] A. a
    
- [ ] B. b
    
- [ ] C. c
    
- [ ] D. The code declaration of the Diet class does not compile.
    
- [ ] E. The main() method does not compile.
    
- [ ] F. The code compiles but produces an exception at runtime.
    
- [ ] G. None of the above.
    

### 19. Which of the following is printed by the Bear program?

Java

```
public class Bear {
    enum FOOD {
        BERRIES, INSECTS {
            public boolean isHealthy() { return true; }
        },
        FISH, ROOTS, COOKIES, HONEY;
        public abstract boolean isHealthy();
    }
    public static void main(String[] args) {
        System.out.print(FOOD.INSECTS);
        System.out.print(FOOD.INSECTS.ordinal());
        System.out.print(FOOD.INSECTS.isHealthy());
        System.out.print(FOOD.COOKIES.isHealthy());
    } 
}
```

- [ ] A. insects
    
- [ ] B. Insects
    
- [ ] C. 0
    
- [ ] D. 1
    
- [ ] E. false
    
- [ ] F. The code does not compile.
    

### 20. What is the output of this code?

Java

```
13: record Gorilla(int x, Double y) {
14:     Gorilla {}
15:     Gorilla() { this(1,2.0); }
16: }
17: record Family(Gorilla parent1, Gorilla parent2) {}
18:
19: var family = new Family(new Gorilla(1, null), new Gorilla(0, 1.2));
20: System.out.print(switch (family) {
21:     case Family(var a, var b) -> "1";
22:     case Family(Gorilla c, Gorilla (int d, double e)) -> "2";
23:     case Family(Gorilla (int f, Double g), var h) -> "3";
24:     case Family(Gorilla i, Gorilla (int j, Double k)) -> "4";
25:     case Family(Object m, Object n) -> "5";
26:     case null -> "6";
27:     default -> "7";
28: });
```

- [ ] A. 1
    
- [ ] B. 2
    
- [ ] C. 3
    
- [ ] D. 4
    
- [ ] E. 5
    
- [ ] F. 6
    
- [ ] G. 7
    
- [ ] H. None of the above
    

### 21. Given the following record declaration, which line of code can fill in the blank and allow the code to compile?

Java

```
public record RabbitFood(int size, String brand, LocalDate expires) {
    public static int MAX_STORAGE = 100;
    public RabbitFood() {
        __________________________;
    }
}
```

- [ ] A. size = MAX_STORAGE
    
- [ ] B. this.size = 10
    
- [ ] C. if(expires.isAfter(LocalDate.now())) throw new RuntimeException()
    
- [ ] D. if(brand==null) super.brand = "Unknown"
    
- [ ] E. throw new RuntimeException()
    
- [ ] F. None of the above
    

### 22. Which of the following can be inserted in the rest() method? (Choose all that apply.)

Java

```
public class Lion {
    class Cub {}
    static class Den {}
    static void rest() {
        ________________;
    } 
}
```

- [ ] A. Cub a = Lion.new Cub()
    
- [ ] B. Lion.Cub b = new Lion().Cub()
    
- [ ] C. Lion.Cub c = new Lion().new Cub()
    
- [ ] D. var d = new Den()
    
- [ ] E. var e = Lion.new Cub()
    
- [ ] F. Lion.Den f = Lion.new Den()
    
- [ ] G. Lion.Den g = new Lion.Den()
    
- [ ] H. var h = new Cub()
    

### 23. Given the following program, what can be inserted into the blank line that would allow it to print Swim! at runtime?

Java

```
interface Swim {
    default void perform() { System.out.print("Swim!"); }
}
interface Dance {
    default void perform() { System.out.print("Dance!"); }
}
public class Penguin implements Swim, Dance {
    public void perform() { System.out.print("Smile!"); }
    private void doShow() {
        ____________________;
    }
    public static void main(String[] eggs) {
        new Penguin().doShow();
    } 
}
```

- [ ] A. super.perform()
    
- [ ] B. Swim.perform()
    
- [ ] C. super.Swim.perform()
    
- [ ] D. Swim.super.perform()
    
- [ ] E. The code does not compile regardless of what is inserted into the blank.
    
- [ ] F. The code compiles, but due to polymorphism, it is not possible to produce the requested output without creating a new object.
    

### 24. Which lines of the following interface do not compile? (Choose all that apply.)

Java

```
1: public interface BigCat {
2:     abstract String getName();
3:     static int hunt() { getName(); return 5; }
4:     default void climb() { rest(); }
5:     private void roar() { getName(); climb(); hunt(); }
6:     private static boolean sneak() { roar(); return true; }
7:     private int rest() { return 2; };
8: }
```

- [ ] A. Line 2
    
- [ ] B. Line 3
    
- [ ] C. Line 4
    
- [ ] D. Line 5
    
- [ ] E. Line 6
    
- [ ] F. Line 7
    
- [ ] G. None of the above
    

### 25. What does the following program print?

Java

```
1: public class Zebra {
2:     private int x = 24;
3:     public int hunt() {
4:         String message = "x is ";
5:         abstract class Stripes {
6:             private int x = 0;
7:             public void print() {
8:                 System.out.print(message + Zebra.this.x);
9:             }
10:        }
11:        var s = new Stripes() {};
12:        s.print();
13:        return x;
14:    }
15:    public static void main(String[] args) {
16:        new Zebra().hunt();
17:    } 
18: }
```

- [ ] A. x is 0
    
- [ ] B. x is 24
    
- [ ] C. Line 6 generates a compiler error.
    
- [ ] D. Line 8 generates a compiler error.
    
- [ ] E. Line 11 generates a compiler error.
    
- [ ] F. None of the above.
    

### 26. What is the output of the following program?

Java

```
20: public enum Animals {
21:     MAMMAL(List.of(2,4)),
22:     INVERTEBRATE(List.of(2, 4, 6, 8, 100)),
23:     BIRD(null) {
24:         public int stand() {
25:             return legs.get(0) + 4;
26:         }
27:     };
28:     List<Integer> legs;
29:     Animals(List<Integer> legs) {
30:         this.legs = legs;
31:     }
32:     public int stand() { return legs.get(0); }
33:     public static void main(String[] a) {
34:         Animals.BIRD.legs = List.of(-1);
35:         System.out.println(Animals.BIRD.stand());
36:     } 
37: }
```

- [ ] A. null
    
- [ ] B. -1
    
- [ ] C. 3
    
- [ ] D. 4
    
- [ ] E. Compiler error on lines 23.
    
- [ ] F. Compiler error on lines 24.
    
- [ ] G. Compiler error on line 34.
    
- [ ] H. The code compiles but produces a NullPointerException at runtime.
    
- [ ] I. None of the above.
    

### 27. Assuming a record is defined with at least one field, which components does the compiler always insert, each of which may be overridden or redeclared? (Choose all that apply.)

- [ ] A. A no-argument constructor
    
- [ ] B. An accessor method for each field
    
- [ ] C. The toString() method
    
- [ ] D. The equals() method
    
- [ ] E. A mutator method for each field
    
- [ ] F. A sort method for each field
    
- [ ] G. The hashCode() method
    

### 28. Which of the following classes and interfaces do not compile? (Choose all that apply.)

Java

```
public abstract class Camel { void travel(); }
public interface EatsGrass { private abstract int chew(); }
public abstract class Elephant {
    abstract private class SleepsAlot {
        abstract int sleep();
    } 
}
public class Eagle { abstract soar(); }
public interface Spider { default void crawl() {} }
```

- [ ] A. Camel
    
- [ ] B. EatsGrass
    
- [ ] C. Elephant
    
- [ ] D. Eagle
    
- [ ] E. Spider
    

### 29. How many lines of the following program contain a compilation error?

Java

```
1: class Primate {
2:     protected int age = 2;
3:     { age = 1; }
4:     public Primate() {
5:         this().age = 3;
6:     }
7: }
8: public class Orangutan {
9:     protected int age = 4;
10:    { age = 5; }
11:    public Orangutan() {
12:        this().age = 6;
13:    }
14:    public static void main(String[] bananas) {
15:        final Primate x = (Primate)new Orangutan();
16:        System.out.println(x.age);
17:    }
18: }
```

- [ ] A. None, and the program prints 1 at runtime.
    
- [ ] B. None, and the program prints 3 at runtime.
    
- [ ] C. None, but it causes a ClassCastException at runtime.
    
- [ ] D. 1
    
- [ ] E. 2
    
- [ ] F. 3
    
- [ ] G. 4
    

### 30. Assuming the following classes are declared as top-level types in the same file, which classes contain compiler errors? (Choose all that apply.)

Java

```
sealed class Bird {
    public final class Flamingo extends Bird {}
}
sealed class Monkey {}
class EmperorTamarin extends Monkey {}
non-sealed class Mandrill extends Monkey {}
sealed class Friendly extends Mandrill permits Silly {}
final class Silly {}
```

- [ ] A. Bird
    
- [ ] B. Monkey
    
- [ ] C. EmperorTamarin
    
- [ ] D. Mandrill
    
- [ ] E. Friendly
    
- [ ] F. Silly
    
- [ ] G. All of the classes compile without issue.