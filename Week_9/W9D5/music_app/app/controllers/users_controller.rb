class UsersController < ApplicationController
    def show
        @user = User.find(params[:id])
        render :show
    end

    def new
        @user = User.new
        render :new
    end

    def create
        @user = User.new(user_params)
        if @user.save
            login!(@user)
            redirect_to user_url(@user)
        else
            flash.now[:errors] = "Failed to create account"
            render :new
        end
    end

    private

    def user_params
        params.require(:user).permit(:email, :password, :session_token)
    end
end