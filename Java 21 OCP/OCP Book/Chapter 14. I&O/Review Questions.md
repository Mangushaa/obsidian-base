## Question 1

Which class would be best to use to read a binary file into a Java object?

- [ ] A. BufferedStream
    
- [ ] B. FileReader
    
- [ ] C. ObjectInputStream
    
- [ ] D. ObjectReader
    
- [ ] E. ObjectOutputStream
    
- [ ] F. ObjectWriter
    
- [ ] G. None of the above
    

## Question 2

Assuming that / is the root directory within the file system, which of the following are true statements? (Choose all that apply.)

- [ ] A. /home/parrot is an absolute path.
    
- [ ] B. /home/parrot is a directory.
    
- [ ] C. /home/parrot is a relative path.
    
- [ ] D. `new File("/home")` will throw an exception if /home does not exist.
    
- [ ] E. `new File("/home").delete()` will throw an exception if /home does not exist.
    
- [ ] F. A Reader offers character encoding, making it more useful when working with String data than an InputStream.
    
- [ ] G. A Reader offers multithreading support, making it more useful than an InputStream.
    

## Question 3

What are possible results of executing the following code? (Choose all that apply.)

Java

```
public static void main(String[] args) throws IOException {
    String line;
    var c = System.console();
    Writer w = c.writer();
    try (w) {
        if ((line = c.readLine("Enter your name: ")) != null)
            w.append(line);
        w.flush();
    }
}
```

- [ ] A. The code runs, but nothing is printed.
    
- [ ] B. The code prints what was entered by the user.
    
- [ ] C. The code behaves the same if throws IOException is removed.
    
- [ ] D. A NullPointerException may be thrown.
    
- [ ] E. A NullPointerException will always be thrown.
    
- [ ] F. A NullPointerException will never be thrown.
    
- [ ] G. The code does not compile.
    

## Question 4

For which value of path sent to this method would it be guaranteed for the following code to output Success?

Java

```
public void removeBadFile(Path path) {
    if(Files.isDirectory(path))
        System.out.println(Files.deleteIfExists(path) ? "Success": "Try Again");
}
```

- [ ] A. path refers to a regular file in the file system.
    
- [ ] B. path refers to a symbolic link in the file system.
    
- [ ] C. path refers to an empty directory in the file system.
    
- [ ] D. path refers to a directory with content in the file system.
    
- [ ] E. path does not refer to a record that exists within the file system.
    
- [ ] F. The code does not compile.
    

## Question 5

Assume that the directory /animals exists and is empty. What is the result of executing the following code?

Java

```
Path path = Path.of("/animals");
try (var z = Files.walk(path)) {
    boolean b = z
        .filter((p,a) -> a.isDirectory() && !path.equals(p)) // x
        .findFirst().isPresent(); // y
    System.out.print(b ? "No Sub": "Has Sub");
}
```

- [ ] A. It prints No Sub.
    
- [ ] B. It prints Has Sub.
    
- [ ] C. The code will not compile because of line x.
    
- [ ] D. The code will not compile because of line y.
    
- [ ] E. The output cannot be determined.
    
- [ ] F. It produces an infinite loop at runtime.
    

## Question 6

What would be the value of name if the instance of Eagle created in the main() method were serialized and then deserialized?

Java

```
import java.io.Serializable;

class Bird {
    protected transient String name;
    public void setName(String name) { this.name = name; }
    public String getName() { return name; }
    public Bird() {
        this.name = "Matt";
    }
}

public class Eagle extends Bird implements Serializable {
    { this.name = "Olivia"; }
    public Eagle() {
        this.name = "Bridget";
    }
    public static void main(String[] args) {
        var e = new Eagle();
        e.name = "Adeline";
    }
}
```

- [ ] A. Adeline
    
- [ ] B. Bridget
    
- [ ] C. Matt
    
- [ ] D. Olivia
    
- [ ] E. null
    
- [ ] F. The code does not compile.
    
- [ ] G. The code compiles but throws an exception at runtime.
    

## Question 7

Assume that /kang exists as a symbolic link to the directory /mammal/kangaroo within the file system. Which of the following statements are correct about this code snippet? (Choose all that apply.)

Java

```
var path = Path.of("/kang");
if(Files.isDirectory(path) && Files.isSymbolicLink(path))
    Files.createDirectory(path.resolve("joey"));
```

- [ ] A. A new directory will always be created.
    
- [ ] B. A new directory may be created.
    
- [ ] C. If the code creates a directory, it will be reachable at /kang/joey.
    
- [ ] D. If the code creates a directory, it will be reachable at /mammal/joey.
    
- [ ] E. The code does not compile.
    
- [ ] F. The code will compile but will always throw an exception at runtime.
    

## Question 8

Assuming that the /fox/food-schedule.csv file exists with the specified contents, what is the expected output of calling printData() on it?

### /fox/food-schedule.csv

Code snippet

```
6am,Breakfast
9am,SecondBreakfast
12pm,Lunch
6pm,Dinner
```

Java

```
void printData(Path path) throws IOException {
    Files.readAllLines(path) // r1
        .flatMap(p -> Stream.of(p.split(","))) // r2
        .map(q -> q.toUpperCase()) // r3
        .forEach(System.out::println);
}
```

- [ ] A. The code will not compile because of line r1.
    
- [ ] B. The code will not compile because of line r2.
    
- [ ] C. The code will not compile because of line r3.
    
- [ ] D. It throws an exception at runtime.
    
- [ ] E. It does not print anything at runtime.
    
- [ ] F. None of the above.
    

## Question 9

Given the following method and file1 data, which statements are correct? (Choose all that apply.)

### file1 data

Plaintext

```
ABCDEF
```

Java

```
public void copyFile(File file1, File file2) throws Exception {
    var reader = new InputStreamReader(new FileInputStream(file1));
    try (var writer = new FileWriter(file2)) {
        char[] buffer = new char[5];
        while(reader.read(buffer) != -1) {
            writer.write(buffer);
            // n1
        }
    }
}
```

- [ ] A. The code does not compile because reader is not a buffered stream.
    
- [ ] B. The code does not compile because writer is not a buffered stream.
    
- [ ] C. The contents of the copied file are: ABCDEF
    
- [ ] D. The contents of the copied file are: ABCDEFBCDE
    
- [ ] E. The contents of the copied file cannot be determined.
    
- [ ] F. If we check file2 on line n1 within the file system after five iterations of the while loop, it may be empty.
    
- [ ] G. If we check file2 on line n1 within the file system after five iterations, it will contain exactly 50 characters.
    
- [ ] H. This method contains a resource leak.
    

## Question 10

Which of the following correctly create Path instances? (Choose all that apply.)

- [ ] A. `new Path("jaguar.txt")`
    
- [ ] B. `Path.get("cats","lynx.txt")`
    
- [ ] C. `new java.io.File("tiger.txt").toPath()`
    
- [ ] D. `Paths.get("ocelot.txt")`
    
- [ ] E. `Path.of(".")`
    

## Question 11

Which classes will allow the following to compile? (Choose all that apply.)

Java

```
var is = new BufferedInputStream(new FileInputStream("z.txt"));
InputStream wrapper = new ____________________________________________ (is);
try (wrapper) {}
```

- [ ] A. BufferedInputStream
    
- [ ] B. BufferedReader
    
- [ ] C. BufferedWriter
    
- [ ] D. FileInputStream
    
- [ ] E. ObjectInputStream
    
- [ ] F. ObjectOutputStream
    
- [ ] G. None of the above, as the first line does not compile
    

## Question 12

What is the result of executing the following code? (Choose all that apply.)

Java

```
4: var p = Path.of("sloth.schedule");
5: var a = Files.readAttributes(p, BasicFileAttributes.class);
6: Files.mkdir(p.resolve(".backup"));
7: if(a.size()>0 && a.isDirectory()) {
8:     a.setTimes(null,null,null);
9: }
```

- [ ] A. It compiles and runs without issue.
    
- [ ] B. The code will not compile because of line 5.
    
- [ ] C. The code will not compile because of line 6.
    
- [ ] D. The code will not compile because of line 7.
    
- [ ] E. The code will not compile because of line 8.
    
- [ ] F. None of the above.
    

## Question 13

Which of the following are true statements about serialization in Java? (Choose all that apply.)

- [ ] A. All non-null instance members of the class must be serializable or marked transient.
    
- [ ] B. Records are automatically serializable.
    
- [ ] C. Serialization involves converting data into Java objects.
    
- [ ] D. Serializable is a functional interface.
    
- [ ] E. The class must declare a static serialVersionUID variable.
    
- [ ] F. The class must extend the Serializable class.
    
- [ ] G. The class must implement the Serializable interface.
    

## Question 14

What is the output of the following code? (Choose three.)

Java

```
22: var p1 = Path.of("/zoo/./bear","../food.txt");
23: p1.normalize().relativize(Path.of("/lion"));
24: System.out.println(p1);
25:
26: var p2 = Path.of("/zoo/animals/bear/koala/food.txt");
27: System.out.println(p2.subpath(1,3).getName(1));
28:
29: var p3 = Path.of("/pets/../cat.txt");
30: var p4 = Path.of("./dog.txt");
31: System.out.println(p4.resolve(p3));
```

- [ ] A. `../../lion`
    
- [ ] B. `/zoo/./bear/../food.txt`
    
- [ ] C. `animal`
    
- [ ] D. `bear`
    
- [ ] E. `/pets/../cat.txt`
    
- [ ] F. `/pets/../cat.txt/./dog.txt`
    

## Question 15

Suppose that the working directory is /weather and the absolute path /weather/winter/snow.dat represents a file that exists within the file system. Which of the following lines of code create an object that represents the file? (Choose all that apply.)

- [ ] A. `new File("/weather", "winter", "snow.dat")`
    
- [ ] B. `new File("/weather/winter/snow.dat")`
    
- [ ] C. `new File("/weather/winter", new File("snow.dat"))`
    
- [ ] D. `new File("weather", "/winter/snow.dat")`
    
- [ ] E. `new File(new File("/weather/winter"), "snow.dat")`
    
- [ ] F. `Path.of("/weather/winter/snow.dat").toFile()`
    
- [ ] G. None of the above
    

## Question 16

Assuming zoo-data.txt exists and is not empty, what statements about the following method are correct? (Choose all that apply.)

Java

```
private void echo() throws IOException {
    var o = new FileWriter("new-zoo.txt");
    try (var f = new FileReader("zoo-data.txt");
         var b = new BufferedReader(f); o) {
    }
    o.write(b.readLine());
    o.write("");
}
```

- [ ] A. When run, the method creates a new file with one line of text in it.
    
- [ ] B. When run, the method creates a new file with two lines of text in it.
    
- [ ] C. When run, the method creates a new file with the same number of lines as the original file.
    
- [ ] D. The method compiles but will produce an exception at runtime.
    
- [ ] E. The method does not compile.
    
- [ ] F. The method uses byte stream classes.
    

## Question 17

Which are true statements? (Choose all that apply.)

- [ ] A. NIO.2 includes a method to delete an entire directory tree.
    
- [ ] B. NIO.2 includes a method to traverse a directory tree.
    
- [ ] C. NIO.2 includes methods that are aware of symbolic links.
    
- [ ] D. `Files.readAttributes()` cannot access file system dependent attributes.
    
- [ ] E. `Files.readAttributes()` is often more performant since it reads multiple attributes rather than accessing individual attributes.
    
- [ ] F. `Files.readAttributes()` works with the File object.
    

## Question 18

Assume that reader is a valid stream whose next characters are PEACOCKS. Which is true about the output of the following code snippet?

Java

```
var sb = new StringBuilder();
sb.append((char)reader.read());
reader.mark(10);
for(int i=0; i<2; i++) {
    sb.append((char)reader.read());
    reader.skip(2);
}
reader.reset();
reader.skip(0);
sb.append((char)reader.read());
System.out.println(sb.toString());
```

- [ ] A. The code may print PEAE.
    
- [ ] B. The code may print PEOA.
    
- [ ] C. The code may print PEOE.
    
- [ ] D. The code may print PEOS.
    
- [ ] E. The code will always print PEAE.
    
- [ ] F. The code will always print PEOA.
    
- [ ] G. The code will always print PEOE.
    
- [ ] H. The code will always print PEOS.
    

## Question 19

Assuming that the directories and files referenced exist and are not symbolic links, what is the result of executing the following code?

Java

```
var p1 = Path.of("/lizard",".").resolve(Path.of("walking.txt"));
var p2 = new File("/lizard/././actions/../walking.txt").toPath();
System.out.print(Files.isSameFile(p1,p2));
System.out.print(" ");
System.out.print(p1.equals(p2));
System.out.print(" ");
System.out.print(Files.mismatch(p1,p2));
```

- [ ] A. true true -1
    
- [ ] B. true true 0
    
- [ ] C. true false -1
    
- [ ] D. true false 0
    
- [ ] E. false true -1
    
- [ ] F. false true 0
    
- [ ] G. The code does not compile.
    
- [ ] H. The result cannot be determined.
    

## Question 20

Assume that monkey.txt is a file that exists in the current working directory. Which statement about the following code snippet is correct?

Java

```
Files.move(Path.of("monkey.txt"), Path.of("/animals"), StandardCopyOption.ATOMIC_MOVE);
```

- [ ] A. If /animals/monkey.txt exists, it will be overwritten at runtime.
    
- [ ] B. If /animals exists as an empty directory, /animals/monkey.txt will be the new location of the file.
    
- [ ] C. If the move is successful and another process is monitoring the file system, it will not see an incomplete file at runtime.
    
- [ ] D. None of the above.
    

## Question 21

Assume that /monkeys exists as a directory containing multiple files, symbolic links, and subdirectories. Which statement about the following code is correct?

Java

```
var f = Path.of("/monkeys");
try (var m = Files.find(f, 0, (p,a) -> a.isSymbolicLink())) { // y1
    m.map(s -> s.toString())
        .collect(Collectors.toList())
        .stream()
        .filter(s -> s.toString().endsWith(".txt")) // y2
        .forEach(System.out::println);
}
```

- [ ] A. It will print all symbolic links in the directory tree ending in .txt.
    
- [ ] B. It will print the target of all symbolic links in the directory ending in .txt.
    
- [ ] C. It will print nothing.
    
- [ ] D. It does not compile because of line y1.
    
- [ ] E. It does not compile because of line y2.
    
- [ ] F. It compiles but throws an exception at runtime.
    

## Question 22

Which of the following fields will be null after an instance of the class created on line 17 is serialized and then deserialized using ObjectOutputStream and ObjectInputStream?

Java

```
1: import java.io.Serializable;
2: import java.util.List;
3: public class Zebra implements Serializable {
4:     private transient String name = "George";
5:     private static String birthPlace = "Africa";
6:     private transient Integer age;
7:     List<Zebra> friends = new java.util.ArrayList<>();
8:     private Object stripes = new Object();
9:     { age = 10;}
10:    public Zebra() {
11:        this.name = "Sophia";
12:    }
13:    static Zebra writeAndRead(Zebra z) {
14:        // Implementation omitted
15:    }
16:    public static void main(String[] args) {
17:        var zebra = new Zebra();
18:        zebra = writeAndRead(zebra);
19:    } 
20: }
```

- [ ] A. age
    
- [ ] B. birthplace
    
- [ ] C. friends
    
- [ ] D. name
    
- [ ] E. stripes
    
- [ ] F. The code does not compile.
    
- [ ] G. The code compiles but throws an exception at runtime.
    

## Question 23

What are some possible results of executing the following code? (Choose all that apply.)

Java

```
var x = Path.of("/animals/fluffy/..");
Files.walk(x.toRealPath().getParent()) // u1
    .map(p -> p.toAbsolutePath().toString()) // u2
    .filter(s -> s.endsWith(".java"))
    .forEach(System.out::println);
```

- [ ] A. It prints some files in the root directory.
    
- [ ] B. It prints all files in the root directory.
    
- [ ] C. FileSystemLoopException is thrown at runtime.
    
- [ ] D. Another exception is thrown at runtime.
    
- [ ] E. The code will not compile because of line u1.
    
- [ ] F. The code will not compile because of line u2.
    

## Question 24

Assume that the source instance passed to the following method represents a file that exists. Also assume that /flip/sounds.txt exists as a file prior to executing this method. When this method is executed, which statement correctly copies the file to the path specified by /flip/sounds.txt?

Java

```
void copyIntoFlipDirectory(Path source) throws IOException {
    var dolphinDir = Path.of("/flip");
    dolphinDir = Files.createDirectories(dolphinDir);
    var n = Path.of("sounds.txt");
    Files.copy(source, ____________________________________________);
}
```

- [ ] A. dolphinDir
    
- [ ] B. dolphinDir.resolve(n), StandardCopyOption.REPLACE_EXISTING
    
- [ ] C. dolphinDir, StandardCopyOption.REPLACE_EXISTING
    
- [ ] D. dolphinDir.resolve(n)
    
- [ ] E. The method does not compile, regardless of what is placed in the blank.
    
- [ ] F. The method compiles but throws an exception at runtime, regardless of what is placed in the blank.
    

## Question 25

Suppose that you need to read text data from a file and want the data to be performant on large files. Which two java.io stream classes can be chained together to best achieve this result? (Choose two.)

- [ ] A. BufferedInputStream
    
- [ ] B. BufferedReader
    
- [ ] C. FileInputStream
    
- [ ] D. FileReader
    
- [ ] E. PrintInputStream
    
- [ ] F. ObjectInputStream
    
- [ ] G. PrintReader