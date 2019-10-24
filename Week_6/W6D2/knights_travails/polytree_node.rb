class PolyTreeNode

    attr_reader :value
    attr_accessor :parent, :children
    
    def initialize(value)
      @value = value
      @parent = nil
      @children = []  
    end

    def parent=(node)
        @parent.children.delete(self) if @parent
        @parent = node
        node.children << self if !node.nil? && !node.children.include?(self)
    end

    def add_child(child)
      child.parent=(self) unless children.include?(child)
    end

    def remove_child(child)
      raise "node is not a child!" if child.parent.nil?
      child.parent = nil
    end

    def dfs(target)
      #debugger
      return self if self.value == target
        @children.each do |child|
            result = child.dfs(target)
            return result if !result.nil? 
            # return child.dfs(target) unless child.nil?
        end
      nil
    end

    def bfs(target)
      queue = []
      queue << self
      until queue.empty?
        first = queue.shift
        return first if first.value == target
        queue += first.children
      end
      nil
    end

end