require_relative "polytree_node"

class KnightPathFinder

  attr_reader :root_node, :move_tree
  attr_accessor :considered_positions

  def self.valid_moves(pos)
    moves = []

    # 1 up, 2 left
    moves << [pos[0]+1,pos[1]-2] unless pos[0]+1 > 7 || pos[1]-2 < 0
    # 2 up, 1 left
    moves << [pos[0]+2,pos[1]-1] unless pos[0]+2 > 7 || pos[1]-1 < 0
    # 2 up, 1 right
    moves << [pos[0]+2,pos[1]+1] unless pos[0]+2 > 7 || pos[1]+1 > 7
    # 1 up, 2 right
    moves << [pos[0]+1,pos[1]+2] unless pos[0]+1 > 7 || pos[1]+2 > 7
    # 1 down, 2 right
    moves << [pos[0]-1,pos[1]+2] unless pos[0]-1 < 0 || pos[1]+2 > 7
    # 2 down, 1 right
    moves << [pos[0]-2,pos[1]+1] unless pos[0]-2 < 0 || pos[1]+1 > 7
    # 2 down, 1 left
    moves << [pos[0]-2,pos[1]-1] unless pos[0]-2 < 0 || pos[1]-1 < 0
    # 1 down, 2 left
    moves << [pos[0]-1,pos[1]-2] unless pos[0]-1 < 0 || pos[1]-2 < 0
    
    moves
  end
  
  def initialize(root_node)
    @root_node = PolyTreeNode.new(root_node)
    @considered_positions = [root_node]
    @move_tree = build_move_tree
  end

  def new_move_positions(pos)
    new = KnightPathFinder.valid_moves(pos) - @considered_positions
    @considered_positions += new
    new
  end

  def build_move_tree
    queue = [] 
    queue << @root_node
    until queue.empty?
      first_node = queue.shift
      new_move_positions(first_node.value).each do |nxt_pos|
        child = PolyTreeNode.new(nxt_pos)
        first_node.add_child(child)
        queue << child
      end
    end
  end

  def trace_path_back(end_node)
    #p end_node.value
    arr = [end_node.value]
    until end_node.parent.nil?
      end_node = end_node.parent
      #p end_node.value
      arr.unshift(end_node.value)
    end
    arr
  end

  def find_path(end_pos)
    #@root_node.bfs(end_pos).value
    trace_path_back(@root_node.bfs(end_pos))
  end
  
end

# kpf = KnightPathFinder.new([0,0])
# p kpf.build_move_tree == kpf.move_tree
# p kpf.find_path([2,1])

kpf = KnightPathFinder.new([0, 0])
p kpf.find_path([7, 6]) # => [[0, 0], [1, 2], [2, 4], [3, 6], [5, 5], [7, 6]]
p kpf.find_path([6, 2]) # => [[0, 0], [1, 2], [2, 0], [4, 1], [6, 2]]