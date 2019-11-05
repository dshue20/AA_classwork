class UsersController < ApplicationController
  # matcher = "%#{whazzername.split(//).join('%')}%" == params[:query]
  # User.where('username LIKE UPPER(?)', params[:query])
  # Movie.joins(:actors).where('UPPER(actors.name) LIKE UPPER(?)', matcher)
  # string LIKE pattern [ESCAPE escape-character]
  # 'abc' LIKE '%a%'
  # substring('foobar' from '%#"o_b#"%' for '#')   oob

  def index
    if params[:query]
      users = User.where('username LIKE ?', "%#{params[:query]}%")
    else
      users = User.all
    end
    debugger
    render json: users
  end

  def create
    user = User.new(user_params)
    if user.save
      render json: user
    else
      render json: user.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    render json: User.find_by_id(params[:id])
  end

  def update
    user = User.find_by_id(params[:id])
    if user.update(user_params)
      render json: user
    else
      render json: user.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    user = User.find_by_id(params[:id])
    user.destroy
    render plain: 'Destruction successful'
  end

  private

  def user_params
    params.require(:user).permit(:username)
  end
end