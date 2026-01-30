# import os
# import requests
# from typing import Optional
# from azure.ai.contentsafety import ContentSafetyClient
# from azure.ai.contentsafety.models import (
#     TextCategory,
#     ImageCategory,
#     AnalyzeTextOptions,
#     AnalyzeImageOptions,
#     ImageData,
# )
# from azure.core.credentials import AzureKeyCredential
# from azure.core.exceptions import HttpResponseError
# from app.core.config import configs


# class ContentSafety:
#     def __init__(self):
#         self.key = configs.AZURE_CONTENT_SAFETY_KEY1
#         self.endpoint = configs.AZURE_CONTENT_SAFETY_ENDPOINT
#         self.client = ContentSafetyClient(endpoint=self.endpoint, credential=AzureKeyCredential(self.key))

#     def analyze_text(self, text: str) -> dict:
#         request = AnalyzeTextOptions(text=text)
#         try:
#             response = self.client.analyze_text(request)
#         except HttpResponseError as e:
#             print("Analyze text failed.")
#             if e.error:
#                 print(f"Error code: {e.error.code}")
#                 print(f"Error message: {e.error.message}")
#             raise

#         return {
#             "hate": self._get_severity(response, TextCategory.HATE),
#             "self_harm": self._get_severity(response, TextCategory.SELF_HARM),
#             "sexual": self._get_severity(response, TextCategory.SEXUAL),
#             "violence": self._get_severity(response, TextCategory.VIOLENCE),
#         }

#     def analyze_image_file(self, file_path: str) -> dict:
#         with open(file_path, "rb") as f:
#             image_data = ImageData(content=f.read())
#         return self._analyze_image(image_data)

#     def analyze_image_url(self, image_url: str) -> dict:
#         try:
#             response = requests.get(image_url)
#             response.raise_for_status()
#         except Exception as e:
#             print(f"Failed to download image: {e}")
#             raise

#         image_data = ImageData(content=response.content)
#         return self._analyze_image(image_data)

#     def _analyze_image(self, image_data: ImageData) -> dict:
#         request = AnalyzeImageOptions(image=image_data)
#         try:
#             response = self.client.analyze_image(request)
#         except HttpResponseError as e:
#             print("Analyze image failed.")
#             if e.error:
#                 print(f"Error code: {e.error.code}")
#                 print(f"Error message: {e.error.message}")
#             raise

#         return {
#             "hate": self._get_severity(response, ImageCategory.HATE),
#             "self_harm": self._get_severity(response, ImageCategory.SELF_HARM),
#             "sexual": self._get_severity(response, ImageCategory.SEXUAL),
#             "violence": self._get_severity(response, ImageCategory.VIOLENCE),
#         }

#     def _get_severity(self, response, category) -> Optional[int]:
#         for item in response.categories_analysis:
#             if item.category == category:
#                 return item.severity
#         return None
