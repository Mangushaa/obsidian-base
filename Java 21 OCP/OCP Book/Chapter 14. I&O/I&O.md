
## Referencing Files and Directories

**NOTE:** Determining whether a path is relative or absolute is file system dependent.

- If a path starts with a forward slash (/), it is absolute, with / as the root directory, such as /bird/parrot.png.
- If a path starts with a drive letter (C:), it is absolute, with the drive letter as the root directory, such as C :/bird/info.
- Otherwise, it is a relative path, such as bird/parrot.png.

![[Pasted image 20260703234531.png]]

**NOTE:** Suppose the current directory is /fish/shark/hammerhead. In this case, ../swim.txt is a valid relative path equivalent to /fish/shark/swim.txt. Likewise, ./play.png refers to play.png in the current directory. 

**NOTE:** A symbolic link is a special file within a file system that serves as a reference or pointer to another file or directory. Suppose we have asymbolic link from /zoo/user/favorite to /fish/shark. The shark folder and its elements can be accessed directly or via the symbolic link.

```
/fish/shark/swim.txt
/zoo/user/favorite/swim.txt

// Same file
```

## Creating a File or Path

**NOTE:** Referencing File/Directory

```
IO -> java.io.File
NIO -> java.nio.file.Path
```

```
File zooFile1 = new File("/home/tiger/data/stripes.txt");
File zooFile2 = new File("/home/tiger", "data/stripes.txt");
File parent = new File("/home/tiger");
File zooFile3 = new File(parent, "data/stripes.txt");
System.out.println(zooFile1.exists());
```

**NOTE:** All three create a File object that points to the same location on disk. If we passed null as the parent to the final constructor, it would be ignored, and the method would behave the same way as the single String constructor.


**NOTE:** Path is an interface

```
public static Path of(String first, String… more)

Path zooPath1 = Path.of("/home/tiger/data/stripes.txt");
Path zooPath2 = Path.of("/home", "tiger", "data",
"stripes.txt");
System.out.println(Files.exists(zooPath1));
```

**NOTE:** The method allows passing a varargs parameter to pass additional path elements. The values are combined and automatically separated by the operating system–dependent file separator. 

## Other Ways to Create a Path
![[Pasted image 20260704000831.png]]


## Switching Between File and Path

```
File file = new File("rabbit");
Path newPath = file.toPath();
File backToFile = newPath.toFile();
```

## Operating on File and Path

![[Pasted image 20260704001435.png]]
![[Pasted image 20260704001510.png]]


**NOTE:** As a rule of thumb, if an NIO.2 method declares an IOException, it usually requires the paths it operates on to exist.

## Providing NIO.2 Optional Parameters
![[Pasted image 20260704003543.png]]
## Interacting with NIO.2 Paths

**NOTE:** Just like String values, Path instances are immutable. 

## Viewing the Path

**NOTE:** The getNameCount() and getName() methods are often used together to retrieve the number of elements in the path and a reference to each element, respectively. 

**NOTE:** These two methods do not include the root directory as part ofthe path.

```
Path path = Path.of("/land/hippo/harry.happy");
System.out.println("The Path is: " + path);
for(int i=0; i<path.getNameCount(); i++)
    System.out.println(" Element " + i + " is: " +      path.getName(i));
    
    
The Path is: /land/hippo/harry.happy
Element 0 is: land
Element 1 is: hippo
Element 2 is: harry.happy



var p = Path.of("/");
System.out.print(p.getNameCount()); // 0
System.out.print(p.getName(0)); // IllegalArgumentException
```


## Creating Part of the Path

```
var p = Path.of("/mammal/omnivore/raccoon.image");
System.out.println("Path is: " + p);
for (int i = 0; i < p.getNameCount(); i++) {
   System.out.println(" Element " + i + " is: " +
   p.getName(i));
}
System.out.println();
System.out.println("subpath(0,3): " + p.subpath(0, 3));
System.out.println("subpath(1,2): " + p.subpath(1, 2));
System.out.println("subpath(1,3): " + p.subpath(1, 3));

Path is: /mammal/omnivore/raccoon.image
Element 0 is: mammal
Element 1 is: omnivore
Element 2 is: raccoon.image
subpath(0,3): mammal/omnivore/raccoon.image
subpath(1,2): omnivore
subpath(1,3): omnivore/raccoon.image


var q = p.subpath(0, 4); // IllegalArgumentException
var x = p.subpath(1, 1); // IllegalArgumentException
```

**NOTE:** Like getNameCount() and getName(), subpath() is zero-indexed and doesnot include the root. Also like getName(), subpath() throws an exception if invalid indices are provided.

## Accessing Path Elements

```
public void printPathInformation(Path path) {
   System.out.println("Filename is: " + path.getFileName());
   System.out.println(" Root is: " + path.getRoot());
   Path currentParent = path;
   while((currentParent = currentParent.getParent()) != null)
      System.out.println(" Current parent is: " + currentParent);
      System.out.println();
}


printPathInformation(Path.of("zoo"));
printPathInformation(Path.of("/zoo/armadillo/shells.txt"));
printPathInformation(Path.of("./armadillo/../shells.txt"));

Filename is: zoo
Root is: null

Filename is: shells.txt
Root is: /
Current parent is: /zoo/armadillo
Current parent is: /zoo
Current parent is: /
Filename is: shells.txt

Root is: null
Current parent is: ./armadillo/..
Current parent is: ./armadillo
Current parent is: .
```


**NOTE:** 
- The getParent() method returns null if operated on the root
  path or at the top of a relative path
- The getRoot() method returns the root element of the file within the file system, or null if the path is a relative path 
## Resolving Paths

```
Path path1 = Path.of("/cats/../panther");
Path path2 = Path.of("food");
System.out.println(path1.resolve(path2));

/cats/../panther/food


Path path3 = Path.of("/turkey/food");
System.out.println(path3.resolve("/tiger/cage"));

Since the input parameter is an absolute path
/tiger/cage
```

**NOTE:** If an absolute path is provided as input to the method, that is the value returned. Simply put, you cannot combine two absolute paths using resolve().

## Relativizing a Path

```
var path1 = Path.of("fish.txt");
var path2 = Path.of("friendly/birds.txt");
System.out.println(path1.relativize(path2));
System.out.println(path2.relativize(path1));

../friendly/birds.txt
../../fish.txt


var path3 = Path.of("E:\\habitat");
var path4 = Path.of("E:\\sanctuary\\raven\\poe.txt");
System.out.println(path3.relativize(path4));
System.out.println(path4.relativize(path3));

..\sanctuary\raven\poe.txt
..\..\..\habitat

var path1 = Path.of("/primate/chimpanzee");
var path2 = Path.of("bananas.txt");
path1.relativize(path2); // IllegalArgumentException

var path3 = Path.of("C:\\primate\\chimpanzee");
var path4 = Path.of("D:\\storage\\bananas.txt");
path3.relativize(path4); // IllegalArgumentException
```

**NOTE:** If both path values are relative, the relativize() method computes the paths as if they are in the same current working directory. Alternatively, if both path values are absolute, the method computes the relative path from one absolute location to another, regardless of the current working directory.

**NOTE:** The relativize() method requires both paths to be absolute or relative and throws an exception if the types are mixed.

**NOTE:** On Windows-based systems, it also requires that if absolute paths are used, both paths must have the same root directory or drive letter.

## Normalizing a Path

```
var p1 = Path.of("./armadillo/../shells.txt");
System.out.println(p1.normalize()); // shells.txt

var p2 = Path.of("/cats/../panther/food");
System.out.println(p2.normalize()); // /panther/food

var p3 = Path.of("../../fish.txt");
System.out.println(p3.normalize()); // ../../fish.txt


var p1 = Path.of("/pony/../weather.txt");
var p2 = Path.of("/weather.txt");
System.out.println(p1.equals(p2)); //
false
System.out.println(p1.normalize().equals(p2.normalize())); //
true
```

**NOTE:** The equals() method returns true if two paths represent the same value. (not actual same path, but equal pathes after normalizing)

## Retrieving the Real File System Path

**NOTE:** Current working directory of /horse/schedule

**NOTE:** toRealPath() will throw an exception if the path does not exist.

```
System.out.println(Path.of("/zebra/food.txt").toRealPath());
System.out.println(Path.of(".././food.txt").toRealPath());

System.out.println(Path.of(".././food.txt").toRealPath());
```

**NOTE:** We can also use the toRealPath() method to gain access to the current working directory as a Path object.

```
System.out.println(Path.of(".").toRealPath());
```

## Reviewing NIO.2 Path APIs
![[Pasted image 20260706003040.png]]


## Creating, Moving, and Deleting Files and Directories

### Making directory

```
public static Path createDirectory(Path dir,
FileAttribute<?>… attrs) throws IOException

public static Path createDirectories(Path dir,
FileAttribute<?>… attrs) throws IOException
```

**NOTE:** The **createDirectory()** method will create a directory and throw an exception if it already exists or if the paths leading up to the directory do not exist.

**NOTE:** The **createDirectories()** method creates the target directory along with any nonexistent parent directories leading up to the path. If all of the directories already exist, createDirectories() will simply complete without doing anything. 

```
Files.createDirectory(Path.of("/bison/field"));
Files.createDirectories(Path.of("/bison/field/pasture/green"));
```

The first example creates a new directory, field, in the directory /bison, assuming /bison exists; otherwise, an exception is thrown. Contrast this with the second example, which creates the directory green along with any of the following parent directories if they do not already exist, including bison, field, and pasture.

## Copying Files

```
public static Path copy(Path source, Path target,
CopyOption… options) throws IOException

Files.copy(Path.of("/panda/bamboo.txt"), Path.of("/panda-save/bamboo.txt"));

Files.copy(Path.of("/turtle"), Path.of("/turtleCopy"));
```

**NOTE:** When directories are copied, the copy is shallow. A shallow copy means that the files and subdirectories within the directory are not copied. A deep copy means that the entire tree is copied, including all of its content and subdirectories. A deep copy typically requires recursion, where a method calls itself.

```
public void copyPath(Path source, Path target) {
   try {
      Files.copy(source, target);
      if(Files.isDirectory(source))
         try (Stream<Path> s = Files.list(source)) {
            s.forEach(p -> copyPath(p,
               target.resolve(p.getFileName())));
         }
   } catch(IOException e) {
      // Handle exception
   }
}
```

**NOTE:** The method first copies the path, whether a file or a directory. If it is a directory, only a shallow copy is performed. Next, it checks whether the path is a directory and, if it is, performs a recursive copy of each of its elements

## Copying and Replacing Files

**NOTE:** By default, if the target already exists, the copy() method will throw an exception. You can change this behavior by providing the StandardCopyOption enum value REPLACE_EXISTING to the method. 

```
Files.copy(Path.of("book.txt"), Path.of("movie.txt"), StandardCopyOption.REPLACE_EXISTING);
```

## Copying Files with I/O Streams

```
public static long copy(InputStream in, Path target,
CopyOption… options) throws IOException

public static long copy(Path source, OutputStream out) throws IOException

----------------------------------------------------

try (var is = new FileInputStream("source-data.txt")) {
   // Write I/O stream data to a file
   Files.copy(is, Path.of("/mammals/wolf.txt"));
}

Files.copy(Path.of("/fish/clown.xsl"), System.out);
```

## Copying Files into a Directory

```
var file = Path.of("food.txt");
var directory = Path.of("/enclosure");
Files.copy(file, directory); // Exception

var file = Path.of("food.txt");
var directory = Path.of("/enclosure/food.txt");
Files.copy(file, directory); // Correct way
```

**NOTE:** The command tries to create a new file named
/enclosure. Since the path /enclosure already exists, an exception is thrown at runtime. On the other hand, if the directory did not exist, the process would create a new file with the contents of food.txt, but the file would be called /enclosure. 

## Moving or Renaming Paths with move()

```
public static Path move(Path source, Path target,
CopyOption… options) throws IOException
```

```
Files.move(Path.of("C:\\zoo"), Path.of("C:\\zoo-new"));
Files.move(Path.of("C:\\user\\addresses.txt"),
Path.of("C:\\zoo-new\\addresses2.txt"));
```

**NOTE:** The first example renames the zoo directory to a zoo-new directory, keeping all of the original contents from the source directory. The second example moves the addresses.txt file from the directory user to the directory zoo- new and renames it addresses2.txt.

**NOTE:** Like copy(), move() requires REPLACE_EXISTING to overwrite the target if it exists; otherwise, it will throw an exception. Also like copy(), move() will not put a file in a directory if the source is a file and the target is a directory.
Instead, it will create a new file with the name of the directory.

## Performing an Atomic Move

```
Files.move(Path.of("mouse.txt"), Path.of("gerbil.txt"), StandardCopyOption.ATOMIC_MOVE);
```

**NOTE:** any process monitoring the file system never
sees an incomplete or partially written file. If the file system does not support this feature, an AtomicMoveNotSupportedException will be thrown.

**NOTE:** Note that while ATOMIC_**MOVE** is available as a member of the StandardCopyOption type, it will throw an UnsupportedOperationException  if passed to a copy() method. (Copy can't be atomic cause it's actual changing where data is placed in memory)

## Deleting a File with delete() and deleteIfExists()

```
public static void delete(Path path) throws IOException

public static boolean deleteIfExists(Path path) throws IOException
```

**NOTE:** To delete a directory, it must be empty. Both of these methods throw an exception if operated on a nonempty directory. In addition, if the path is a symbolic link, the symbolic link will be deleted, not the path that the symbolic link points to.

**NOTE:** The methods differ on how they handle a path that does not exist. The delete() method throws an exception if the path does not exist, while the deleteIfExists() method returns true if the delete was successful or false otherwise.

## Comparing Files with isSameFile() and mismatch()

**NOTE:** isSameFile() is actual impl of checking is **paths** pointing to same file/directory, cause simple equals basically checks underhood strings to be equals.

**NOTE:** isSameFile() will trigger an exception if the paths do
not exist, there is a special case in which it does not. If the two path objects are equal in terms of equals(), the method will just return true without checking whether the file exists.

**NOTE:** mismatch() method is used to compare content of files not path. The method returns -1 if the files are the same; otherwise, it returns the index starting from 0 of the first position in the file that differs.

# Introducing I/O Streams

**NOTE:** Most InputStream classes have a corresponding OutputStream class, and vice versa. There are some exceptions to this rule. For the exam, you should know that PrintWriter has no accompanying PrintReader class. Likewise, the PrintStream is an OutputStream that has no corresponding InputStream class. It also does not have Output in its name. 

**NOTE**: InputStreamReader is a Reader that takes an InputStream, while OutputStreamWriter is a Writer that takes an OutputStream.

![[Pasted image 20260707022003.png]]

## Reading and Writing Files

```
void copyStream(InputStream in, OutputStream out) throws IOException {
   int b;
   while ((b = in.read()) != -1) {
      out.write(b);
   }
}

void copyStream(Reader in, Writer out) throws IOException {
   int b;
   while ((b = in.read()) != -1) {
      out.write(b);
   }
}
```


**NOTE:** Event through we are reading  byte -> int is returned. 
-1 indicates end of stream.

```
10: void copyStream(InputStream in, OutputStream out) throws IOException {
11: int batchSize = 1024;
12: var buffer = new byte[batchSize];
13: int lengthRead;
14: while ((lengthRead = in.read(buffer, 0, batchSize)) > 0) {
15:    out.write(buffer, 0, lengthRead);
16:    out.flush();
17: }
```

**NOTE:** When data is written to an output stream, the underlying operating system does not guarantee that the
data will make it to the file system immediately. The flush() method requests that all accumulated data be written immediately to disk. 

**NOTE:** If the source file does not exist, a FileNotFoundException, which inherits IOException, will be thrown. If the destination file already exists, this implementation will overwrite it. We can pass an optional boolean second parameter to FileWriter for an append flag if we want to change this behavior.

**NOTE:** reading a line *bufferedReader.readLine()* strips the line breaks, readLine method present only in **BufferedReader** class.

**NOTE:** PrintStream and PrintWriter. These classes contain four key methods. The print() and println() methods print data with and without a new line, respectively.

```
void copyTextFile(File src, File dest) throws IOException {
   try (var reader = new BufferedReader(new FileReader(src));
        var writer = new PrintWriter(new FileWriter(dest))) {
      String line = null;
      while ((line = reader.readLine()) != null)
         writer.println(line);
      }
}
```

**NOTE:** we used a String, there are numerous overloaded versions of println(), which take everything from primitives and String values to objects. Under the covers, these methods often just perform String.valueOf().

**NOTE:** The print stream classes have the distinction of being the only I/O stream classes we cover that do not have corresponding input stream classes. And unlike other OutputStream classes, PrintStream does not have Output in its name.

**NOTE:** Unlike the majority of the other I/O streams we’ve covered, the methods in the print stream classes do not throw any checked exceptions. If they did, you would be required to catch a checked exception any time you called System.out.print()!

## Enhancing with Files

```
private void copyPathAsString(Path input, Path output) throws IOException {
   String string = Files.readString(input);
   Files.writeString(output, string);
}

private void copyPathAsBytes(Path input, Path output) throws IOException {
   byte[] bytes = Files.readAllBytes(input);
   Files.write(output, bytes);
}

private void copyPathAsLines(Path input, Path output) throws IOException {
   List<String> lines = Files.readAllLines(input);
   Files.write(output, lines);
}
```

**NOTE:** All 3 methods will read full file, that can cause OutOfMemoryError. To prevent reading full file we can use

```
private void readLazily(Path path) throws IOException {
   try (Stream<String> s = Files.lines(path)) {
      s.forEach(System.out::println);
   }
} // Contents of the file are read and processed lazily
```
![[Pasted image 20260707183336.png]]

**NOTE:** Files.lines() read file lazily line by line.

**NOTE:** To mix I/O streams and NIO.2. Conveniently, Files
includes two convenience methods for getting I/O streams.

```
private void copyPath(Path input, Path output) throws IOException {
   try (var reader = Files.newBufferedReader(input);
        var writer = Files.newBufferedWriter(output)) {
      String line = null;
      while ((line = reader.readLine()) != null) {
         writer.write(line);
         writer.newLine();
      } 
   } 
}
```

![[Pasted image 20260707184309.png]]
![[Pasted image 20260707184325.png]]
![[Pasted image 20260707184355.png]]

## Serializing Data

**NOTE:** 
- Serialization - converting objects to byte stream
- Marshaling - converting to format (JSON, CSV, XML) suitable for passing value to subsystem

```
import java.io.Serializable;

public class Gorilla implements Serializable {
   private static final long serialVersionUID = 1L;
   private String name;
   private int age;
   private Boolean friendly;
   private transient String favoriteFood;
}
```
![[Pasted image 20260707190741.png]]

**NOTE:** What happens to data marked transient on deserialization? It reverts to its default Java values, such as 0.0 for double, or null for an object. 
![[Pasted image 20260707190838.png]]


**NOTE:** Any process attempting to serialize an object will throw a NotSerializableException if the class does not implement the Serializable interface properly.

**NOTE:** How to Make a Class Serializable
- The class must be marked Serializable.
- Every instance member of the class must be serializable, marked transient, or have a null value at the time of serialization.

**NOTE:** If field class is not serializable (not implements Serializable) if marked transient then will work fine, also if that instance is null, then we can also omit 2 rule.

**NOTE**: Records follows same rules as class

## Storing Data with ObjectOutputStream and ObjectInputStream

```
// ObjectInputStream
public Object readObject() throws IOException,
ClassNotFoundException

// ObjectOutputStream
public void writeObject(Object obj) throws IOException
```


```
List<Gorilla> readFromFile(File dataFile) throws IOException, ClassNotFoundException {
	var gorillas = new ArrayList<Gorilla>();
	try (var in = new ObjectInputStream(
			 new BufferedInputStream(new
				FileInputStream(dataFile)))) {
		while (true) {
			var object = in.readObject();
			if (object instanceof Gorilla g)
				gorillas.add(g);
		}
	} catch (EOFException e) {
// File end reached
}
	return gorillas;
}
```

**NOTE:** To read object from file we are not using -1 or null as marker for file end cause it can be just data inside object. Instead we are using infinite loop with EOFException try-catch

**NOTE:** If your program happens to know the number of objects in the I/O stream, you can call readObject() a fixed number of times, rather than using an infinite loop.

**NOTE:** readObject() declares a checked ClassNotFoundException since the class might not be available on deserialization.
![[Pasted image 20260707235943.png]]

## Understanding the Deserialization Creation Process

**NOTE:** To serialize value it's parent can be not seializable, it's ok, since Object class is itselft not serializable. 

**NOTE:** When you deserialize an object, the constructor of the serialized class, along with any instance initializers, is not called when the object is created. Java will call the no-arg constructor of the first **nonserializable** parent class it can find in the class hierarchy. So any constructor of **serializable** parent will be not executed!!!

**NOTE:** I superclass is implementing **serializable** then subclass can also be serialized.

![[Pasted image 20260708004925.png]]

## Interacting with Users

System.in/out can be used in a try-with-resources statement or by calling close(), although closing them is not recommended. Closing the System streams makes them permanently unavailable for all threads in the remainder of the program.

```
try (var out = System.out) {}
System.out.println("Hello"); // Do not prints anything but not throw exception
```

**NOTE:** Closing System.err is a particularly bad idea, since the stack traces from all exceptions will be hidden.

```
var reader = new BufferedReader(new
InputStreamReader(System.in));
try (reader) {}
String data = reader.readLine(); // IOException
```

**NOTE:** Unlike the PrintStream class, most InputStream implementations will throw an exception if you try to operate on a closed I/O stream.

## Acquiring Input with Console

```
Console c = new Console(); // DOES NOT COMPILE, Console constructor is private
```

```
Console console = System.console();
if (console != null) {
	String userInput = console.readLine();
    console.writer().println("You entered: " + userInput);
	console.flush();
} else {
	System.err.println("Console not available");
}
```


**NOTE:** The Console object may not be available, depending on where the code is being called. If it is not available, System.console() returns null. It is imperative that you check for a null value before attempting to use a Console object!

**NOTE:** The Console class includes access to two streams for reading and writing data.
```
public Reader reader()
public PrintWriter writer()
```

Accessing these classes is analogous to calling System.in and System.out directly, although they use character streams rather than byte streams. In this manner, they are more appropriate for handling text data.

**NOTE:** System.in and System.out is final


## Formatting Console Data

```
// PrintStream
public PrintStream format(String format, Object… args)

public PrintStream format(Locale loc, String format, Object… args)


// PrintWriter
public PrintWriter format(String format, Object… args)

public PrintWriter format(Locale loc, String format, Object… args)
```

**NOTE:** Java includes printf() methods, which function identically to the format() methods. The only thing you need to know about these methods is that they are interchangeable with format().

```
Console console = System.console();
	if (console == null) {
		throw new RuntimeException("Console not available");
	} else {
		console.writer().println("Welcome to Our Zoo!");
		console.format("It has %d animals and employs %d people", 391, 25);
		console.writer().println();
		console.printf("The zoo spans %5.1f acres", 128.91);
		console.flush();
	}
```

## Reading Console Data

```
public String readLine()
public String readLine(String fmt, Object… args)
public char[] readPassword()
public char[] readPassword(String fmt, Object… args)
```

## Working with Advanced APIs

### Manipulating Input Streams

```
// InputStream and Reader
public boolean markSupported()
public void mark(int readLimit)
public void reset() throws IOException
public long skip(long n) throws IOException
```

**NOTE:** Not all input stream classes support mark() and reset(). Make sure to call markSupported() on the I/O stream before calling these methods, or an exception will be thrown at runtime.

## Marking Data

**NOTE:** Assume that we have an InputStream instance whose next values are LION.

```
public void readData(InputStream is) throws IOException {
	System.out.print((char) is.read()); // L
	if (is.markSupported()) {
		is.mark(100); // Marks up to 100 bytes
		System.out.print((char) is.read()); // I
		System.out.print((char) is.read()); // O
		is.reset(); // Resets stream to position before I
	}
	System.out.print((char) is.read()); // I
	System.out.print((char) is.read()); // O
	System.out.print((char) is.read()); // N
}
```

**NOTE:** What about the value of 100 that we passed to the mark() method? This value is called the readLimit. It instructs the I/O stream that we expect to call reset() after at most 100 bytes. If our program calls reset() after reading more than 100 bytes from calling mark(100), it may throw an exception, depending on the I/O stream class.

**NOTE:** In actuality, mark() and reset() are not putting the data back into the I/O stream but are storing the data in a temporary buffer in memory to be read again. Therefore, you should not call the mark() operation with too large a value, as this could take up a lot of memory.

## Skipping Data

```
System.out.print ((char)is.read()); // T
is.skip(2); // Skips I and G
is.read(); // Reads E but doesn't output it
System.out.print((char)is.read()); // R
System.out.print((char)is.read()); // S
```

**NOTE:** The return parameter of skip() tells us how many values were skipped.

![[Pasted image 20260708132259.png]]

## Checking File Accessibility

```
System.out.print(Files.isHidden(Path.of("/walrus.txt")));

System.out.print(Files.isReadable(Path.of("/seal/baby.png")));

System.out.print(Files.isWritable(Path.of("dolphin.txt")));

System.out.print(Files.isExecutable(Path.of("whale.png")));
```

## Improving Attribute Access

![[Pasted image 20260708132748.png]]

**NOTE:** The Files class includes the following method to read attributes of a class in a read-only capacity:

```
public static <A extends BasicFileAttributes> A readAttributes( Path path, Class<A> type, LinkOption… options) throws IOException


var path = Path.of("/turtles/sea.txt");
BasicFileAttributes data = Files.readAttributes(path, BasicFileAttributes.class);

System.out.println("Is a directory? " + data.isDirectory());
System.out.println("Is a regular file? " +
data.isRegularFile());
System.out.println("Is a symbolic link? " +
data.isSymbolicLink());
System.out.println("Size (in bytes): " + data.size());
System.out.println("Last modified: " +
data.lastModifiedTime());
```

## Modifying Attributes

```
public static <V extends FileAttributeView> V
getFileAttributeView( Path path, Class<V> type,
LinkOption… options)
```

```
// Modify file last modified time
FileTime lastModifiedTime = FileTime.fromMillis(
attributes.lastModifiedTime().toMillis() + 10_000);

view.setTimes(lastModifiedTime, null, null);
After the updatable view is retrieved, we need to call readAttributes() on the view to obtain the file metadata. From there, we create a new FileTime
value and set it using the setTimes() method:
// BasicFileAttributeView instance method

public void setTimes(FileTime lastModifiedTime,
FileTime lastAccessTime, FileTime createTime)
```

**NOTE:** Not all file attributes can be modified with a view. For example, you cannot set a property that changes a file into a directory. Likewise, you cannot change the size of the object without modifying its contents.

## Traversing a Directory Tree

```
public static Stream<Path> walk(Path start,
FileVisitOption… options) throws IOException

public static Stream<Path> walk(Path start, int maxDepth, FileVisitOption… options) throws IOException
```

**NOTE:** The first walk() method relies on a default maximum depth of Integer.MAX_VALUE, while the overloaded version allows the user to set a maximum depth.

## Avoiding Circular Paths

**NOTE:** The walk() method is different in that it does not follow symbolic links by default and requires the FOLLOW_LINKS option to be enabled. 

```
try (var s = Files.walk(source,
FileVisitOption.FOLLOW_LINKS))
```

**NOTE:** throwing a FileSystemLoopException if a path is visited twice.

## Searching a Directory

```
public static Stream<Path> find(Path start,
int maxDepth, BiPredicate<Path, BasicFileAttributes> matcher, FileVisitOption… options) throws IOException



var path = Path.of("/bigcats");
long minSize = 1_000;
try (var s = Files.find(path, 10,
(p, a) -> a.isRegularFile()
&& p.toString().endsWith(".java")
&& a.size() > minSize)) {
	s.forEach(System.out::println);
}
```

![[Pasted image 20260708140014.png]]

![[Pasted image 20260708140034.png]]

![[Pasted image 20260708140057.png]]