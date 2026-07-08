import 'package:http/http.dart' as http;

import '../core/constants/app_constants.dart';

class ApiService {
  const ApiService({this.baseUrl = AppConstants.apiBaseUrl});

  final String baseUrl;

  Future<http.Response> getHealth() {
    return http.get(Uri.parse('$baseUrl/health'));
  }
}
