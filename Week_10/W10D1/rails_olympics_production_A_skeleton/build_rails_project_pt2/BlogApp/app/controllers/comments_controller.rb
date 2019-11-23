class CommentsController < ApplicationController
    def create
        @comment = Comment.new(comment_params)
        @comment.save
        redirect_to blog_url(@comment.blog)
    end

    def destroy
        @comment = Comment.find(params[:id])
        old = @comment.blog.id
        @comment.delete
        redirect_to blog_url(old)
    end

    private

    def comment_params
        params.require(:comment).permit(:body, :author_id, :blog_id)
    end

end