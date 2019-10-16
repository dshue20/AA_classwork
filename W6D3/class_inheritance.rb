class Employee

    attr_reader :name, :title, :salary, :boss
    attr_accessor :bonus

    def initialize(name,title,salary,boss)
        @name = name
        @title = title
        @salary = salary
        @boss = boss
    end
    
    def bonus(multiplier)
        bonus = salary * multiplier
    end

end

class Manager < Employee

    attr_accessor :employees_assigned
    def initialize(name,title,salary,boss)
        super(name,title,salary,boss)
        @employees_assigned = employees_assigned
    end

    def bonus(multiplier)
        bonus = (employees_assigned.inject(0) {|acc,emp| acc += emp.salary}) * multiplier
    end

end

ned = Manager.new("Ned","Founder",1000000,nil)
darren = Manager.new("Darren","TA Manager",78000,ned)
shawna = Employee.new("Shawna","TA",12000,darren)
david = Employee.new("David","TA",10000,darren)
ned.employees_assigned = [darren,shawna,david]
darren.employees_assigned = [shawna,david]
p ned.bonus(5) # => 500_000
p darren.bonus(4) # => 88_000
p david.bonus(3) # => 30_000