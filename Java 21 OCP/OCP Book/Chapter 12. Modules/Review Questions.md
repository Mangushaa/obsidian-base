## Question 1

Which statement is true of the following module?

- [ ] A. The directory structure shown is a valid module.
    
- [ ] B. The directory structure would be a valid module if module.java were added directly underneath zoo/staff.
    
- [ ] C. The directory structure would be a valid module if module.java were added directly underneath zoo.
    
- [ ] D. The directory structure would be a valid module if module-info.java were added directly underneath zoo/staff.
    
- [ ] E. The directory structure would be a valid module if module-info.java were added directly underneath zoo.
    
- [ ] F. None of these changes would make this directory structure a valid module.
    

## Question 2

Suppose module puppy depends on module dog and module dog depends on module animal. Fill in the blank so that code in module dog can access the animal.behavior package in module animal.

- [ ] A. export
    
- [ ] B. exports
    
- [ ] C. require
    
- [ ] D. requires
    
- [ ] E. require transitive
    
- [ ] F. requires transitive
    
- [ ] G. None of the above
    

## Question 3

Fill in the blanks so this command to run the program is correct:

- [ ] A. -d and -m
    
- [ ] B. -d and –p
    
- [ ] C. -m and -d
    
- [ ] D. -m and -p
    
- [ ] E. -p and -d
    
- [ ] F. -p and -m
    
- [ ] G. None of the above
    

## Question 4

Which of the following pairs make up a service?

- [ ] A. Consumer and service locator
    
- [ ] B. Consumer and service provider interface
    
- [ ] C. Service locator and service provider
    
- [ ] D. Service locator and service provider interface
    
- [ ] E. Service provider and service provider interface
    

## Question 5

A(n) _____________ module is on the classpath while a(n) _____________ module is on the module path. (Choose all that apply.)

- [ ] A. automatic, named
    
- [ ] B. automatic, unnamed
    
- [ ] C. named, automatic
    
- [ ] D. named, unnamed
    
- [ ] E. unnamed, automatic
    
- [ ] F. unnamed, named
    
- [ ] G. None of the above
    

## Question 6

Which of the following statements are true in a module-info.java file? (Choose all that apply.)

- [ ] A. The opens directive allows the use of reflection.
    
- [ ] B. The opens directive declares that an API is called.
    
- [ ] C. The use directive allows the use of reflection.
    
- [ ] D. The use directive declares that an API is called.
    
- [ ] E. The uses directive allows the use of reflection.
    
- [ ] F. The uses directive declares that an API is called.
    

## Question 7

An automatic module name is generated if one is not supplied. Which of the following JAR filenames and generated automatic module name pairs are correct? (Choose all that apply.)

- [ ] A. emily-1.0.0.jar and emily
    
- [ ] B. emily-1.0.0-SNAPSHOT.jar and emily
    
- [ ] C. emily_the_cat-1.0.0.jar and emily_the_cat
    
- [ ] D. emily_the_cat-1.0.0.jar and emily-the-cat
    
- [ ] E. emily.$.jar and emily
    
- [ ] F. emily.$.jar and emily.
    
- [ ] G. emily.$.jar and emily..
    

## Question 8

Which of the following statements are true? (Choose all that apply.)

- [ ] A. Modules with cyclic dependencies will not compile.
    
- [ ] B. Packages with a cyclic dependency will not compile.
    
- [ ] C. A cyclic dependency always involves exactly two modules.
    
- [ ] D. A cyclic dependency always involves at least two requires statements.
    
- [ ] E. An unnamed module can be involved in a cyclic dependency with an automatic module.
    

## Question 9

Suppose you are creating a service provider that contains the following class. Which line of code needs to be in your module-info.java?

- [ ] A. provides dragon.Dragon by magic.Magic;
    
- [ ] B. provides dragon.Dragon using magic.Magic;
    
- [ ] C. provides dragon.Dragon with magic.Magic;
    
- [ ] D. provides magic.Magic by dragon.Dragon;
    
- [ ] E. provides magic.Magic using dragon.Dragon;
    
- [ ] F. provides magic.Magic with dragon.Dragon;
    

## Question 10

What is true of a module containing a file named module-info.java with the following contents? (Choose all that apply.)

- [ ] A. All packages inside the module are automatically exported.
    
- [ ] B. No packages inside the module are automatically exported.
    
- [ ] C. A main method inside the module can be run.
    
- [ ] D. A main method inside the module cannot be run since the class is not exposed.
    
- [ ] E. The module-info.java file contains a compiler error.
    
- [ ] F. The module-info.java filename is incorrect.
    

## Question 11

Suppose module puppy depends on module dog and module dog depends on module animal. Which lines allow module puppy to access the animal.behavior package in module animal? (Choose all that apply.)

- [ ] A. require on line S
    
- [ ] B. require on line T
    
- [ ] C. requires on line S
    
- [ ] D. requires on line T
    
- [ ] E. require transitive on line S
    
- [ ] F. require transitive on line T
    
- [ ] G. requires transitive on line S
    
- [ ] H. requires transitive on line T
    

## Question 12

Which of the following modules are provided by the JDK? (Choose all that apply.)

- [ ] A. java.base
    
- [ ] B. java.desktop
    
- [ ] C. java.logging
    
- [ ] D. java.util
    
- [ ] E. jdk.base
    
- [ ] F. jdk.compiler
    
- [ ] G. jdk.xerces
    

## Question 13

Which of the following compiles and is equivalent to this loop?

- [ ] A.
    

- [ ] B.
    

- [ ] C.
    

- [ ] D.
    

- [ ] E. None of the above
    

## Question 14

Which of the following is a legal command to run a modular program where n is the module name and c is the fully qualified class name?

- [ ] A. `java --module-path x -m n.c`
    
- [ ] B. `java --module-path x -p n.c`
    
- [ ] C. `java --module-path x-x -m n/c`
    
- [ ] D. `java --module-path x -p n/c`
    
- [ ] E. `java --module-path x-x -m n-c`
    
- [ ] F. `java --module-path x -p n-c`
    
- [ ] G. None of the above
    

## Question 15

For a top-down migration, all modules other than named modules are _____________ modules and are on the _____________.

- [ ] A. automatic, classpath
    
- [ ] B. automatic, module path
    
- [ ] C. unnamed, classpath
    
- [ ] D. unnamed, module path
    
- [ ] E. None of the above
    

## Question 16

Suppose you have separate modules for a service provider interface, service provider, service locator, and consumer. If you add a second service provider module, how many of the existing modules do you need to recompile?

- [ ] A. Zero
    
- [ ] B. One
    
- [ ] C. Two
    
- [ ] D. Three
    
- [ ] E. Four
    

## Question 17

Suppose we have a JAR file named cat-1.2.3-RC1.jar, and Automatic-Module-Name in the MANIFEST.MF is set to dog. What should an unnamed module referencing this automatic module include in module-info.java?

- [ ] A. `requires cat;`
    
- [ ] B. `requires cat.RC;`
    
- [ ] C. `requires cat-RC;`
    
- [ ] D. `requires dog;`
    
- [ ] E. None of the above
    

## Question 18

Two commands create artifacts that include smaller versions of the JDK. Which are used to create an .exe file and a directory, respectively?

- [ ] A. jimage and jlink
    
- [ ] B. jimage and jpackage
    
- [ ] C. jlink and jimage
    
- [ ] D. jlink and jpackage
    
- [ ] E. jpackage and jimage
    
- [ ] F. jpackage and jlink
    

## Question 19

Which is a true statement about the following module?

- [ ] A. All modules can reference the com.dragon.fire package.
    
- [ ] B. All modules can reference the com.dragon.scales package.
    
- [ ] C. Only the castle module can reference the com.dragon.fire package.
    
- [ ] D. Only the castle module can reference the com.dragon.scales package.
    
- [ ] E. None of the above.
    

## Question 20

Which would you expect to see when describing any module?

- [ ] A. `requires java.base mandated`
    
- [ ] B. `requires java.core mandated`
    
- [ ] C. `requires java.lang mandated`
    
- [ ] D. `requires mandated java.base`
    
- [ ] E. `requires mandated java.core`
    
- [ ] F. `requires mandated java.lang`
    
- [ ] G. None of the above
    

## Question 21

Suppose you have separate modules for a service provider interface, service provider, service locator, and consumer. Which module(s) need to specify a requires directive on the service provider?

- [ ] A. Service locator
    
- [ ] B. Service provider interface
    
- [ ] C. Consumer
    
- [ ] D. Consumer and service locator
    
- [ ] E. Consumer and service provider
    
- [ ] F. Service locator and service provider interface
    
- [ ] G. Consumer, service locator, and service provider interface
    
- [ ] H. None of the above
    

## Question 22

Which are true statements? (Choose all that apply.)

- [ ] A. An automatic module exports all packages to named modules.
    
- [ ] B. An automatic module exports only the specified packages to named modules.
    
- [ ] C. An automatic module exports no packages to named modules.
    
- [ ] D. An unnamed module exports only the named packages to named modules.
    
- [ ] E. An unnamed module exports all packages to named modules.
    
- [ ] F. An unnamed module exports no packages to named modules.
    

## Question 23

Which is the first line to contain a compiler error?

- [ ] A. Line 1.
    
- [ ] B. Line 2.
    
- [ ] C. Line 3.
    
- [ ] D. Line 4.
    
- [ ] E. Line 5.
    
- [ ] F. The code does not contain any compiler errors.
    

## Question 24

Which is a true statement about a package in a JAR on the classpath containing a module-info.java file?

- [ ] A. It is possible to make the package available to all other modules on the classpath.
    
- [ ] B. It is possible to make the package available to all other modules on the module path.
    
- [ ] C. It is possible to make the package available to exactly one other specific module on the classpath.
    
- [ ] D. It is possible to make the package available to exactly one other specific module on the module path.
    
- [ ] E. It is possible to make sure the package is not available to any other modules on the classpath.
    

## Question 25

Suppose you have separate modules for a service provider interface, service provider, service locator, and consumer. Which statements are true about the directives you need to specify? (Choose all that apply.)

- [ ] A. The consumer must use the requires directive.
    
- [ ] B. The consumer must use the uses directive.
    
- [ ] C. The service locator must use the requires directive.
    
- [ ] D. The service locator must use the uses directive.
    
- [ ] E. None of the above.