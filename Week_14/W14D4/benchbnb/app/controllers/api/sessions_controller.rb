class Api::SessionsController < ApplicationController
    def create
        @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
        if @user
            login(@user)
        else
            render json: @user.errors.full_messages
        end
    end

    def destroy
        if current_user
            logout
            render json: "{}"
        else
            render json: "No current user found", status: 404
        end
    end

end