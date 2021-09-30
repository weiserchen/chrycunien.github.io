# Others

There are many other principles that we may use in design.

## Encapsulate what varies
- Encapsulate those codes that may be changed frequently, using interface to replace concrete class.
- By using the same interface calling some same methods, you don't have to bother the actual implementation but focus on the funcionality. 
- The polymorphism (dynamic binding) will help resolve the actual method in runtime.

## Favor Composition over Inheritance
- Composition and Inheritance are all about code reuse.
- But usually `Is-A` relationship of Inheritance is too strong for most scenario.
- Composition can be more flexible because it resolve the implementation at runtime instead of compile time.

### Inheritance
- Advantage:
    - Easy for code reuse by simply using `extends` keywork in many languages. This allows child classes immediately have nearly all functionalities that the parent class has.
- Disadvantage:
    - The modification of parent class will affect the child classes.
    - It cannot change the object at runtime but at compile time.

### Composition
- Advantage:
    - Have strong encapsulation by only exposing its interface without internal implementation.
    - It can combine new method implementation at runtime with ease.
- Disadvantage:
    - Less efficiency and you have to create much more fields (references of components) of the class.

## Least Knowledge Principle
- Make a system loosely coupled.
- loosely coupled: have minimum knowledge of other components, it only knows about others' interfaces (API).
- This can be achieved by strong encapsulation with several levels of access modifiers (public, package, protected, private). 
- For internal attributes, you can add many getter and setter to add an additional layer of these attributes.
- The least knowledge principle allow a class to hide its internal implementation by only exposing its interface. Thus it will not affect the outside world when it want to changes its details.