import '../models/domain_navigation.dart';

/// Local, in-memory source of truth for the Domain Navigation UI shell:
/// 3 learning tracks, 6 professional categories, 25 professional domains.
///
/// This is intentionally a plain Dart list/const structure (no database, no
/// backend call) so it can later be swapped for a backend-backed repository
/// without changing stable IDs, localization keys, or the widgets that
/// consume [DomainNavigationCatalog].
abstract final class DomainNavigationCatalog {
  static const List<LearningTrackDefinition> tracks = [
    LearningTrackDefinition(
      stableId: 'basic_communication',
      nameKey: 'trackBasicCommunication',
      iconToken: 'track_basic_communication',
      accentToken: 'accent_neutral',
      availability: CatalogAvailability.available,
      sortOrder: 1,
    ),
    LearningTrackDefinition(
      stableId: 'professional_career',
      nameKey: 'trackProfessionalCareer',
      iconToken: 'track_professional_career',
      accentToken: 'accent_neutral',
      availability: CatalogAvailability.available,
      sortOrder: 2,
    ),
    LearningTrackDefinition(
      stableId: 'exam_preparation',
      nameKey: 'trackExamPreparation',
      iconToken: 'track_exam_preparation',
      accentToken: 'accent_neutral',
      availability: CatalogAvailability.available,
      sortOrder: 3,
    ),
  ];

  static const List<ProfessionalCategoryDefinition> categories = [
    ProfessionalCategoryDefinition(
      stableId: 'digital_technology',
      trackId: 'professional_career',
      nameKey: 'categoryDigitalTechnology',
      descriptionKey: 'categoryDigitalTechnologyDescription',
      iconToken: 'category_digital_technology',
      accentToken: 'accent_cyan_electric_blue',
      availability: CatalogAvailability.available,
      sortOrder: 1,
    ),
    ProfessionalCategoryDefinition(
      stableId: 'corporate_business',
      trackId: 'professional_career',
      nameKey: 'categoryCorporateBusiness',
      descriptionKey: 'categoryCorporateBusinessDescription',
      iconToken: 'category_corporate_business',
      accentToken: 'accent_cobalt_blue',
      availability: CatalogAvailability.available,
      sortOrder: 2,
    ),
    ProfessionalCategoryDefinition(
      stableId: 'hospitality_customer_service',
      trackId: 'professional_career',
      nameKey: 'categoryHospitalityCustomerService',
      descriptionKey: 'categoryHospitalityCustomerServiceDescription',
      iconToken: 'category_hospitality_customer_service',
      accentToken: 'accent_warm_orange_soft_gold',
      availability: CatalogAvailability.available,
      sortOrder: 3,
    ),
    ProfessionalCategoryDefinition(
      stableId: 'engineering_production',
      trackId: 'professional_career',
      nameKey: 'categoryEngineeringProduction',
      descriptionKey: 'categoryEngineeringProductionDescription',
      iconToken: 'category_engineering_production',
      accentToken: 'accent_rust_orange',
      availability: CatalogAvailability.available,
      sortOrder: 4,
    ),
    ProfessionalCategoryDefinition(
      stableId: 'care_health_education',
      trackId: 'professional_career',
      nameKey: 'categoryCareHealthEducation',
      descriptionKey: 'categoryCareHealthEducationDescription',
      iconToken: 'category_care_health_education',
      accentToken: 'accent_soft_mint',
      availability: CatalogAvailability.available,
      sortOrder: 5,
    ),
    ProfessionalCategoryDefinition(
      stableId: 'green_agriculture_supply_chain',
      trackId: 'professional_career',
      nameKey: 'categoryGreenAgricultureSupplyChain',
      descriptionKey: 'categoryGreenAgricultureSupplyChainDescription',
      iconToken: 'category_green_agriculture_supply_chain',
      accentToken: 'accent_emerald_green',
      availability: CatalogAvailability.available,
      sortOrder: 6,
    ),
  ];

  static const List<ProfessionalDomainDefinition> domains = [
    // digital_technology
    ProfessionalDomainDefinition(
      stableId: 'it_software',
      categoryId: 'digital_technology',
      nameKey: 'domainItSoftware',
      iconToken: 'domain_default',
      accentToken: 'accent_cyan_electric_blue',
      availability: CatalogAvailability.comingSoon,
      sortOrder: 1,
    ),
    ProfessionalDomainDefinition(
      stableId: 'ai_data_analytics',
      categoryId: 'digital_technology',
      nameKey: 'domainAiDataAnalytics',
      iconToken: 'domain_default',
      accentToken: 'accent_cyan_electric_blue',
      availability: CatalogAvailability.comingSoon,
      sortOrder: 2,
    ),
    ProfessionalDomainDefinition(
      stableId: 'robotics_iot_automation',
      categoryId: 'digital_technology',
      nameKey: 'domainRoboticsIotAutomation',
      iconToken: 'domain_default',
      accentToken: 'accent_cyan_electric_blue',
      availability: CatalogAvailability.comingSoon,
      sortOrder: 3,
    ),
    ProfessionalDomainDefinition(
      stableId: 'digital_design_ui_ux',
      categoryId: 'digital_technology',
      nameKey: 'domainDigitalDesignUiUx',
      iconToken: 'domain_default',
      accentToken: 'accent_cyan_electric_blue',
      availability: CatalogAvailability.comingSoon,
      sortOrder: 4,
    ),
    ProfessionalDomainDefinition(
      stableId: 'ecommerce_online_operations',
      categoryId: 'digital_technology',
      nameKey: 'domainEcommerceOnlineOperations',
      iconToken: 'domain_default',
      accentToken: 'accent_cyan_electric_blue',
      availability: CatalogAvailability.comingSoon,
      sortOrder: 5,
    ),

    // corporate_business
    ProfessionalDomainDefinition(
      stableId: 'office_administration',
      categoryId: 'corporate_business',
      nameKey: 'domainOfficeAdministration',
      iconToken: 'domain_default',
      accentToken: 'accent_cobalt_blue',
      availability: CatalogAvailability.comingSoon,
      sortOrder: 1,
    ),
    ProfessionalDomainDefinition(
      stableId: 'finance_accounting_audit',
      categoryId: 'corporate_business',
      nameKey: 'domainFinanceAccountingAudit',
      iconToken: 'domain_default',
      accentToken: 'accent_cobalt_blue',
      availability: CatalogAvailability.comingSoon,
      sortOrder: 2,
    ),
    ProfessionalDomainDefinition(
      stableId: 'human_resources_recruitment',
      categoryId: 'corporate_business',
      nameKey: 'domainHumanResourcesRecruitment',
      iconToken: 'domain_default',
      accentToken: 'accent_cobalt_blue',
      availability: CatalogAvailability.comingSoon,
      sortOrder: 3,
    ),
    ProfessionalDomainDefinition(
      stableId: 'legal_compliance',
      categoryId: 'corporate_business',
      nameKey: 'domainLegalCompliance',
      iconToken: 'domain_default',
      accentToken: 'accent_cobalt_blue',
      availability: CatalogAvailability.comingSoon,
      sortOrder: 4,
    ),

    // hospitality_customer_service
    ProfessionalDomainDefinition(
      stableId: 'sales_customer_service',
      categoryId: 'hospitality_customer_service',
      nameKey: 'domainSalesCustomerService',
      iconToken: 'domain_default',
      accentToken: 'accent_warm_orange_soft_gold',
      availability: CatalogAvailability.comingSoon,
      sortOrder: 1,
    ),
    ProfessionalDomainDefinition(
      stableId: 'travel_hospitality',
      categoryId: 'hospitality_customer_service',
      nameKey: 'domainTravelHospitality',
      iconToken: 'domain_default',
      accentToken: 'accent_warm_orange_soft_gold',
      availability: CatalogAvailability.comingSoon,
      sortOrder: 2,
    ),
    ProfessionalDomainDefinition(
      stableId: 'food_beverage',
      categoryId: 'hospitality_customer_service',
      nameKey: 'domainFoodBeverage',
      iconToken: 'domain_default',
      accentToken: 'accent_warm_orange_soft_gold',
      availability: CatalogAvailability.comingSoon,
      sortOrder: 3,
    ),
    ProfessionalDomainDefinition(
      stableId: 'beauty_aesthetics_spa',
      categoryId: 'hospitality_customer_service',
      nameKey: 'domainBeautyAestheticsSpa',
      iconToken: 'domain_default',
      accentToken: 'accent_warm_orange_soft_gold',
      availability: CatalogAvailability.comingSoon,
      sortOrder: 4,
    ),

    // engineering_production
    ProfessionalDomainDefinition(
      stableId: 'manufacturing_engineering',
      categoryId: 'engineering_production',
      nameKey: 'domainManufacturingEngineering',
      iconToken: 'domain_default',
      accentToken: 'accent_rust_orange',
      availability: CatalogAvailability.comingSoon,
      sortOrder: 1,
    ),
    ProfessionalDomainDefinition(
      stableId: 'construction_real_estate',
      categoryId: 'engineering_production',
      nameKey: 'domainConstructionRealEstate',
      iconToken: 'domain_default',
      accentToken: 'accent_rust_orange',
      availability: CatalogAvailability.comingSoon,
      sortOrder: 2,
    ),
    ProfessionalDomainDefinition(
      stableId: 'automotive_mobility',
      categoryId: 'engineering_production',
      nameKey: 'domainAutomotiveMobility',
      iconToken: 'domain_default',
      accentToken: 'accent_rust_orange',
      availability: CatalogAvailability.comingSoon,
      sortOrder: 3,
    ),
    ProfessionalDomainDefinition(
      stableId: 'food_processing_beverage_production',
      categoryId: 'engineering_production',
      nameKey: 'domainFoodProcessingBeverageProduction',
      iconToken: 'domain_default',
      accentToken: 'accent_rust_orange',
      availability: CatalogAvailability.comingSoon,
      sortOrder: 4,
    ),

    // care_health_education
    ProfessionalDomainDefinition(
      stableId: 'clinical_healthcare',
      categoryId: 'care_health_education',
      nameKey: 'domainClinicalHealthcare',
      iconToken: 'domain_default',
      accentToken: 'accent_soft_mint',
      availability: CatalogAvailability.comingSoon,
      sortOrder: 1,
    ),
    ProfessionalDomainDefinition(
      stableId: 'nursing_elderly_care',
      categoryId: 'care_health_education',
      nameKey: 'domainNursingElderlyCare',
      iconToken: 'domain_default',
      accentToken: 'accent_soft_mint',
      availability: CatalogAvailability.comingSoon,
      sortOrder: 2,
    ),
    ProfessionalDomainDefinition(
      stableId: 'education_school',
      categoryId: 'care_health_education',
      nameKey: 'domainEducationSchool',
      iconToken: 'domain_default',
      accentToken: 'accent_soft_mint',
      availability: CatalogAvailability.comingSoon,
      sortOrder: 3,
    ),
    ProfessionalDomainDefinition(
      stableId: 'social_public_services',
      categoryId: 'care_health_education',
      nameKey: 'domainSocialPublicServices',
      iconToken: 'domain_default',
      accentToken: 'accent_soft_mint',
      availability: CatalogAvailability.comingSoon,
      sortOrder: 4,
    ),

    // green_agriculture_supply_chain
    ProfessionalDomainDefinition(
      stableId: 'logistics_supply_chain',
      categoryId: 'green_agriculture_supply_chain',
      nameKey: 'domainLogisticsSupplyChain',
      iconToken: 'domain_default',
      accentToken: 'accent_emerald_green',
      availability: CatalogAvailability.comingSoon,
      sortOrder: 1,
    ),
    ProfessionalDomainDefinition(
      stableId: 'agriculture_agritech',
      categoryId: 'green_agriculture_supply_chain',
      nameKey: 'domainAgricultureAgritech',
      iconToken: 'domain_default',
      accentToken: 'accent_emerald_green',
      availability: CatalogAvailability.comingSoon,
      sortOrder: 2,
    ),
    ProfessionalDomainDefinition(
      stableId: 'fisheries_aquaculture',
      categoryId: 'green_agriculture_supply_chain',
      nameKey: 'domainFisheriesAquaculture',
      iconToken: 'domain_default',
      accentToken: 'accent_emerald_green',
      availability: CatalogAvailability.comingSoon,
      sortOrder: 3,
    ),
    ProfessionalDomainDefinition(
      stableId: 'green_energy_building_operations',
      categoryId: 'green_agriculture_supply_chain',
      nameKey: 'domainGreenEnergyBuildingOperations',
      iconToken: 'domain_default',
      accentToken: 'accent_emerald_green',
      availability: CatalogAvailability.comingSoon,
      sortOrder: 4,
    ),
  ];

  static List<ProfessionalCategoryDefinition> categoriesForTrack(
    String trackId,
  ) {
    final matches = categories.where((c) => c.trackId == trackId).toList()
      ..sort((a, b) => a.sortOrder.compareTo(b.sortOrder));
    return matches;
  }

  static List<ProfessionalDomainDefinition> domainsForCategory(
    String categoryId,
  ) {
    final matches = domains.where((d) => d.categoryId == categoryId).toList()
      ..sort((a, b) => a.sortOrder.compareTo(b.sortOrder));
    return matches;
  }

  static List<LearningTrackDefinition> sortedTracks() =>
      [...tracks]..sort((a, b) => a.sortOrder.compareTo(b.sortOrder));
}
