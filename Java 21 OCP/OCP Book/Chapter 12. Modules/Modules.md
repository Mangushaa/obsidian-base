![[Pasted image 20260711001149.png]]

```
javac --module-path mods -d feeding feeding/zoo/animal/feeding/*.java feeding/module-info.java
```

**NOTE:** As a review, the -d option specifies the directory to place the class files in. The end of the command is a list of the .java files to compile. You can list the files individually or use a wildcard for all .java files in a subdirectory. The new part is module-path. This option indicates the location of any custom module files. You can think of module-path as replacing the classpath option when you are working on a modular program.
![[Pasted image 20260711024127.png]]

**NOTE:** Just like classpath, you can use an abbreviation in the command. The syntax --module-path and -p are equivalent. 
![[Pasted image 20260711024315.png]]
![[Pasted image 20260711024736.png]]


```
module zoo.animal.talks {
exports zoo.animal.talks.content to zoo.staff; // exporting package to specific module
exports zoo.animal.talks.media;
exports zoo.animal.talks.schedule;
requires zoo.animal.feeding;
requires zoo.animal.care;
}
```

![[Pasted image 20260711031125.png]]

![[Pasted image 20260711031141.png]]