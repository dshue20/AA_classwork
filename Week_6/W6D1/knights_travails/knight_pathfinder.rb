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
    first_node
  end
  
end

kpf = KnightPathFinder.new([0,0])
p kpf.move_tree[0]