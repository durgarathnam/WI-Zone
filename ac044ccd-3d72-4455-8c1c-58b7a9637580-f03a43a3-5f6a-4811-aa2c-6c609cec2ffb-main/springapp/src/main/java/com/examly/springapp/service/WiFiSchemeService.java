package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.exceptions.DuplicateWiFiSchemeException;
import com.examly.springapp.exceptions.WiFiSchemeDeletionException;
import com.examly.springapp.exceptions.WiFiSchemeException;
import com.examly.springapp.model.WiFiScheme;

public interface WiFiSchemeService {
    WiFiScheme addWiFiScheme(WiFiScheme wifiScheme) throws DuplicateWiFiSchemeException, WiFiSchemeException;

    WiFiScheme getWiFiSchemeById(Long wifiSchemeId) throws WiFiSchemeException;

    List<WiFiScheme> getAllWiFiSchemes();

    WiFiScheme updateWiFiScheme(Long wifiSchemeId, WiFiScheme wifiScheme);

    WiFiScheme deleteWiFiScheme(Long wifiSchemeId) throws WiFiSchemeDeletionException;

}
