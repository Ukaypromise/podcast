class Api::V1::PostsController < ApplicationController
  before_action :set_post, only: %i[ show update destroy ]

  # GET /posts
  def index
    @posts = Post.order(created_at: :desc)

    posts_with_attachments = @posts.map do |post|
      attachments = {}

      if post.image.attached?
        attachments[:image] = url_for(post.image)
      else
        attachments[:image] = nil
      end

      if post.audio.attached?
        attachments[:audio] = url_for(post.audio)
      else
        attachments[:audio] = nil
      end

      post.as_json.merge(attachments)
    end

    render json: posts_with_attachments
  end

  # # GET /posts
  # def index
  #   @posts = Post.order(created_at: :desc)

  #   posts_with_files = @posts.map do |post|
  #     post_json = post.as_json
  #     if post.image.attached?
  #       post_json.merge!(image_url: url_for(post.image))
  #     end
  #     if post.audio.attached?
  #       post_json.merge!(audio_url: url_for(post.audio))
  #     end
  #     post_json
  #   end

  #   render json: posts_with_files
  # end

  # GET /posts/1
  def show
    response_data = @post.as_json

    if @post.image.attached?
      response_data = response_data.merge(image: url_for(@post.image))
    else
      response_data = response_data.merge(image: nil)
    end

    if @post.audio.attached?
      response_data = response_data.merge(audio: url_for(@post.audio))
    else
      response_data = response_data.merge(audio: nil)
    end

    render json: response_data
  end

  # POST /posts
  def create
    @post = Post.new(post_params)

    if @post.save
      render json: @post, status: :created, location: api_v1_post_url(@post)
    else
      render json: @post.errors.full_messages, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_post
    @post = Post.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def post_params
    params.require(:post).permit(:title, :description, :image, :audio)
  end
end
