class UsersController < BaseApiController
  def current
    render json: current_user, serializer: SessionSerializer
  end

  def update
    current_user.update(image_optim_mode: params[:imageOptimMode], image_compress_mode: params[:imageCompressMode])
    current_user.save!
    render json: current_user, serializer: SessionSerializer
  end

  def images
    if current_user.images and current_user.images.length > 0
      render json: current_user.images.to_json
    else
      render json: []
    end
  end
end
