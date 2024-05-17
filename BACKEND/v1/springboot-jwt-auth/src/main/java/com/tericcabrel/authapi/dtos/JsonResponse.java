package com.tericcabrel.authapi.dtos;

public class JsonResponse {

	private boolean success;
	private String message;
	private String taskCreatedSuccessfully;
	private Long taskId;



	public String getTaskCreatedSuccessfully() {
		return taskCreatedSuccessfully;
	}

	public void setTaskCreatedSuccessfully(String taskCreatedSuccessfully) {
		this.taskCreatedSuccessfully = taskCreatedSuccessfully;
	}

	public Long getTaskId() {
		return taskId;
	}

	public void setTaskId(Long taskId) {
		this.taskId = taskId;
	}

	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public JsonResponse(boolean success, String message) {
		super();
		this.success = success;
		this.message = message;
	}
	public JsonResponse(boolean success, String taskCreatedSuccessfully, Long taskId) {
		super();
		this.success = success;
		this.message = taskCreatedSuccessfully;
		this.taskId=taskId;

	}
	
}
