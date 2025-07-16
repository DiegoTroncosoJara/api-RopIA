-- RopIA Database Schema
-- Sistema completo para usuarios y proveedores de servicios de reciclaje textil
-- Crear base de datos
CREATE DATABASE IF NOT EXISTS ropia_db CHARACTER
SET
  utf8mb4 COLLATE utf8mb4_unicode_ci;

USE ropia_db;

-- =============================================
-- TABLAS DE USUARIOS Y AUTENTICACIÓN
-- =============================================
-- Tabla principal de usuarios
CREATE TABLE
  users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    user_type ENUM ('consumer', 'provider') NOT NULL DEFAULT 'consumer',
    email_verified_at TIMESTAMP NULL,
    phone VARCHAR(20) NULL,
    is_active BOOLEAN DEFAULT TRUE,
    last_login_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_user_type (user_type),
    INDEX idx_created_at (created_at)
  );

-- Perfiles de usuarios consumidores
CREATE TABLE
  user_profiles (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    avatar_url VARCHAR(500) NULL,
    bio TEXT NULL,
    location VARCHAR(255) NULL,
    date_of_birth DATE NULL,
    gender ENUM ('male', 'female', 'other', 'prefer_not_to_say') NULL,
    sustainability_level ENUM ('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',
    interests JSON NULL, -- Array de intereses
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_location (location)
  );

-- Información específica de proveedores
CREATE TABLE
  providers (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    business_name VARCHAR(255) NOT NULL,
    business_type ENUM (
      'atelier',
      'repair',
      'upcycling',
      'recycling',
      'courses',
      'consultant'
    ) NOT NULL,
    description TEXT NULL,
    address TEXT NOT NULL,
    latitude DECIMAL(10, 8) NULL,
    longitude DECIMAL(11, 8) NULL,
    phone VARCHAR(20) NOT NULL,
    website VARCHAR(255) NULL,
    instagram VARCHAR(100) NULL,
    facebook VARCHAR(100) NULL,
    years_experience INT DEFAULT 0,
    certifications TEXT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    verification_date TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_business_type (business_type),
    INDEX idx_location (latitude, longitude),
    INDEX idx_is_active (is_active)
  );

-- Estadísticas de proveedores
CREATE TABLE
  provider_stats (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    provider_id BIGINT UNSIGNED NOT NULL,
    total_jobs INT DEFAULT 0,
    completed_jobs INT DEFAULT 0,
    cancelled_jobs INT DEFAULT 0,
    average_rating DECIMAL(3, 2) DEFAULT 0.00,
    total_reviews INT DEFAULT 0,
    total_earnings DECIMAL(10, 2) DEFAULT 0.00,
    response_time_hours INT DEFAULT 24, -- Tiempo promedio de respuesta en horas
    profile_views INT DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (provider_id) REFERENCES providers (id) ON DELETE CASCADE,
    UNIQUE KEY unique_provider_stats (provider_id)
  );

-- =============================================
-- TABLAS DE SERVICIOS
-- =============================================
-- Categorías de servicios
CREATE TABLE
  service_categories (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    icon VARCHAR(50) NULL,
    color VARCHAR(7) NULL, -- Código hex del color
    description TEXT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

-- Servicios ofrecidos por proveedores
CREATE TABLE
  services (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    provider_id BIGINT UNSIGNED NOT NULL,
    category_id INT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NULL,
    price_from DECIMAL(10, 2) NOT NULL,
    price_to DECIMAL(10, 2) NULL,
    duration_min INT NULL, -- Duración mínima en minutos
    duration_max INT NULL, -- Duración máxima en minutos
    materials_included BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (provider_id) REFERENCES providers (id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES service_categories (id),
    INDEX idx_provider_id (provider_id),
    INDEX idx_category_id (category_id),
    INDEX idx_is_active (is_active),
    INDEX idx_price (price_from, price_to)
  );

-- =============================================
-- TABLAS DE SOLICITUDES Y CITAS
-- =============================================
-- Solicitudes de servicios
CREATE TABLE
  requests (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    provider_id BIGINT UNSIGNED NOT NULL,
    service_id BIGINT UNSIGNED NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    urgency ENUM ('low', 'normal', 'high') DEFAULT 'normal',
    budget_min DECIMAL(10, 2) NULL,
    budget_max DECIMAL(10, 2) NULL,
    preferred_date DATE NULL,
    preferred_time TIME NULL,
    status ENUM (
      'pending',
      'accepted',
      'rejected',
      'in_progress',
      'completed',
      'cancelled'
    ) DEFAULT 'pending',
    provider_response TEXT NULL,
    estimated_completion DATE NULL,
    actual_completion_date TIMESTAMP NULL,
    final_price DECIMAL(10, 2) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (provider_id) REFERENCES providers (id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services (id),
    INDEX idx_user_id (user_id),
    INDEX idx_provider_id (provider_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
  );

-- Fotos adjuntas a solicitudes
CREATE TABLE
  request_photos (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    request_id BIGINT UNSIGNED NOT NULL,
    photo_url VARCHAR(500) NOT NULL,
    caption VARCHAR(255) NULL,
    uploaded_by ENUM ('user', 'provider') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES requests (id) ON DELETE CASCADE,
    INDEX idx_request_id (request_id)
  );

-- Mensajes en solicitudes
CREATE TABLE
  request_messages (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    request_id BIGINT UNSIGNED NOT NULL,
    sender_id BIGINT UNSIGNED NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES requests (id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES users (id) ON DELETE CASCADE,
    INDEX idx_request_id (request_id),
    INDEX idx_sender_id (sender_id),
    INDEX idx_created_at (created_at)
  );

-- Citas programadas
CREATE TABLE
  appointments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    request_id BIGINT UNSIGNED NOT NULL,
    provider_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    appointment_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status ENUM (
      'scheduled',
      'confirmed',
      'in_progress',
      'completed',
      'cancelled',
      'no_show'
    ) DEFAULT 'scheduled',
    notes TEXT NULL,
    reminder_sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES requests (id) ON DELETE CASCADE,
    FOREIGN KEY (provider_id) REFERENCES providers (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    INDEX idx_provider_date (provider_id, appointment_date),
    INDEX idx_user_date (user_id, appointment_date),
    INDEX idx_status (status)
  );

-- =============================================
-- TABLAS DE DISPONIBILIDAD
-- =============================================
-- Disponibilidad de proveedores
CREATE TABLE
  provider_availability (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    provider_id BIGINT UNSIGNED NOT NULL,
    day_of_week TINYINT NOT NULL, -- 0=Domingo, 1=Lunes, etc.
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    break_start TIME NULL,
    break_end TIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (provider_id) REFERENCES providers (id) ON DELETE CASCADE,
    INDEX idx_provider_day (provider_id, day_of_week)
  );

-- Excepciones de disponibilidad (días específicos)
CREATE TABLE
  availability_exceptions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    provider_id BIGINT UNSIGNED NOT NULL,
    exception_date DATE NOT NULL,
    is_available BOOLEAN DEFAULT FALSE,
    start_time TIME NULL,
    end_time TIME NULL,
    reason VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (provider_id) REFERENCES providers (id) ON DELETE CASCADE,
    INDEX idx_provider_date (provider_id, exception_date)
  );

-- =============================================
-- TABLAS DE RESEÑAS Y CALIFICACIONES
-- =============================================
-- Reseñas
CREATE TABLE
  reviews (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    request_id BIGINT UNSIGNED NOT NULL,
    reviewer_id BIGINT UNSIGNED NOT NULL, -- Usuario que hace la reseña
    reviewed_id BIGINT UNSIGNED NOT NULL, -- Usuario/proveedor reseñado
    rating TINYINT NOT NULL CHECK (
      rating >= 1
      AND rating <= 5
    ),
    title VARCHAR(255) NULL,
    comment TEXT NULL,
    is_anonymous BOOLEAN DEFAULT FALSE,
    is_verified BOOLEAN DEFAULT FALSE, -- Si la reseña está verificada
    helpful_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES requests (id) ON DELETE CASCADE,
    FOREIGN KEY (reviewer_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (reviewed_id) REFERENCES users (id) ON DELETE CASCADE,
    INDEX idx_reviewed_id (reviewed_id),
    INDEX idx_rating (rating),
    INDEX idx_created_at (created_at)
  );

-- =============================================
-- TABLAS DE PORTAFOLIO
-- =============================================
-- Elementos del portafolio de proveedores
CREATE TABLE
  portfolio_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    provider_id BIGINT UNSIGNED NOT NULL,
    request_id BIGINT UNSIGNED NULL, -- Si está asociado a una solicitud específica
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    category VARCHAR(100) NULL,
    before_photo_url VARCHAR(500) NULL,
    after_photo_url VARCHAR(500) NOT NULL,
    additional_photos JSON NULL, -- Array de URLs de fotos adicionales
    materials_used TEXT NULL,
    time_taken_hours INT NULL,
    difficulty_level ENUM ('easy', 'medium', 'hard') NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (provider_id) REFERENCES providers (id) ON DELETE CASCADE,
    FOREIGN KEY (request_id) REFERENCES requests (id) ON DELETE SET NULL,
    INDEX idx_provider_id (provider_id),
    INDEX idx_is_featured (is_featured),
    INDEX idx_is_public (is_public)
  );

-- =============================================
-- TABLAS DE ROPERO Y ESCANEO
-- =============================================
-- Prendas escaneadas por usuarios
CREATE TABLE
  wardrobe_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NULL, -- Camisa, pantalón, vestido, etc.
    brand VARCHAR(100) NULL,
    color VARCHAR(50) NULL,
    size VARCHAR(20) NULL,
    material VARCHAR(255) NULL,
    purchase_date DATE NULL,
    purchase_price DECIMAL(10, 2) NULL,
    condition_score TINYINT NULL CHECK (
      condition_score >= 1
      AND condition_score <= 10
    ),
    sustainability_score TINYINT NULL CHECK (
      sustainability_score >= 1
      AND sustainability_score <= 10
    ),
    co2_footprint DECIMAL(8, 2) NULL, -- kg CO2
    water_usage DECIMAL(10, 2) NULL, -- litros
    photo_url VARCHAR(500) NULL,
    qr_code VARCHAR(255) NULL,
    last_worn DATE NULL,
    times_worn INT DEFAULT 0,
    needs_repair BOOLEAN DEFAULT FALSE,
    is_favorite BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_category (category),
    INDEX idx_condition_score (condition_score),
    INDEX idx_sustainability_score (sustainability_score)
  );

-- Resultados de escaneos
CREATE TABLE
  scan_results (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    wardrobe_item_id BIGINT UNSIGNED NULL,
    scan_type ENUM (
      'new_item',
      'condition_check',
      'sustainability_check'
    ) NOT NULL,
    photo_url VARCHAR(500) NOT NULL,
    ai_analysis JSON NULL, -- Resultado del análisis de IA
    detected_materials JSON NULL, -- Materiales detectados
    condition_assessment JSON NULL, -- Evaluación de condición
    sustainability_metrics JSON NULL, -- Métricas de sostenibilidad
    recommendations JSON NULL, -- Recomendaciones de cuidado/reparación
    confidence_score DECIMAL(5, 2) NULL, -- Confianza del análisis (0-100)
    processing_time_ms INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (wardrobe_item_id) REFERENCES wardrobe_items (id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_scan_type (scan_type),
    INDEX idx_created_at (created_at)
  );

-- =============================================
-- TABLAS DE BIOTEXTILES
-- =============================================
-- Biblioteca de biomateriales
CREATE TABLE
  biotextiles (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    contributor_id BIGINT UNSIGNED NULL, -- Usuario que contribuyó la receta
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NULL, -- Cuero, tela, fibra, etc.
    difficulty_level ENUM ('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',
    preparation_time_hours INT NULL,
    drying_time_hours INT NULL,
    cost_estimate DECIMAL(10, 2) NULL,
    sustainability_score TINYINT NULL CHECK (
      sustainability_score >= 1
      AND sustainability_score <= 10
    ),
    durability_score TINYINT NULL CHECK (
      durability_score >= 1
      AND durability_score <= 10
    ),
    flexibility_score TINYINT NULL CHECK (
      flexibility_score >= 1
      AND flexibility_score <= 10
    ),
    water_resistance ENUM ('none', 'low', 'medium', 'high') DEFAULT 'none',
    photo_url VARCHAR(500) NULL,
    video_url VARCHAR(500) NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    verification_date TIMESTAMP NULL,
    view_count INT DEFAULT 0,
    like_count INT DEFAULT 0,
    try_count INT DEFAULT 0, -- Cuántas personas han intentado la receta
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (contributor_id) REFERENCES users (id) ON DELETE SET NULL,
    INDEX idx_contributor_id (contributor_id),
    INDEX idx_category (category),
    INDEX idx_difficulty_level (difficulty_level),
    INDEX idx_sustainability_score (sustainability_score),
    INDEX idx_is_verified (is_verified)
  );

-- Ingredientes de biotextiles
CREATE TABLE
  biotextile_ingredients (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    biotextile_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    quantity VARCHAR(100) NOT NULL, -- "2 tazas", "500ml", etc.
    unit VARCHAR(50) NULL,
    is_optional BOOLEAN DEFAULT FALSE,
    notes TEXT NULL,
    order_index INT DEFAULT 0,
    FOREIGN KEY (biotextile_id) REFERENCES biotextiles (id) ON DELETE CASCADE,
    INDEX idx_biotextile_id (biotextile_id)
  );

-- Pasos de fabricación
CREATE TABLE
  biotextile_steps (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    biotextile_id BIGINT UNSIGNED NOT NULL,
    step_number INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    duration_minutes INT NULL,
    temperature VARCHAR(50) NULL,
    photo_url VARCHAR(500) NULL,
    tips TEXT NULL,
    FOREIGN KEY (biotextile_id) REFERENCES biotextiles (id) ON DELETE CASCADE,
    INDEX idx_biotextile_id (biotextile_id),
    INDEX idx_step_number (step_number)
  );

-- Propiedades y aplicaciones
CREATE TABLE
  biotextile_properties (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    biotextile_id BIGINT UNSIGNED NOT NULL,
    property_type ENUM (
      'physical',
      'chemical',
      'aesthetic',
      'application'
    ) NOT NULL,
    property_name VARCHAR(255) NOT NULL,
    property_value VARCHAR(255) NOT NULL,
    description TEXT NULL,
    FOREIGN KEY (biotextile_id) REFERENCES biotextiles (id) ON DELETE CASCADE,
    INDEX idx_biotextile_id (biotextile_id),
    INDEX idx_property_type (property_type)
  );

-- =============================================
-- TABLAS DE COMUNIDAD Y EVENTOS
-- =============================================
-- Comunidades
CREATE TABLE
  communities (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    creator_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NULL,
    location VARCHAR(255) NULL,
    is_public BOOLEAN DEFAULT TRUE,
    member_count INT DEFAULT 0,
    avatar_url VARCHAR(500) NULL,
    cover_url VARCHAR(500) NULL,
    rules TEXT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (creator_id) REFERENCES users (id) ON DELETE CASCADE,
    INDEX idx_creator_id (creator_id),
    INDEX idx_category (category),
    INDEX idx_is_public (is_public),
    INDEX idx_is_active (is_active)
  );

-- Miembros de comunidades
CREATE TABLE
  community_members (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    community_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    role ENUM ('member', 'moderator', 'admin') DEFAULT 'member',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (community_id) REFERENCES communities (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    UNIQUE KEY unique_community_member (community_id, user_id),
    INDEX idx_community_id (community_id),
    INDEX idx_user_id (user_id)
  );

-- Eventos
CREATE TABLE
  events (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    organizer_id BIGINT UNSIGNED NOT NULL,
    community_id BIGINT UNSIGNED NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category ENUM (
      'workshop',
      'lab',
      'collective',
      'course',
      'meetup'
    ) NOT NULL,
    event_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    location VARCHAR(255) NOT NULL,
    address TEXT NULL,
    latitude DECIMAL(10, 8) NULL,
    longitude DECIMAL(11, 8) NULL,
    max_attendees INT NULL,
    current_attendees INT DEFAULT 0,
    price DECIMAL(10, 2) DEFAULT 0.00,
    materials_included BOOLEAN DEFAULT FALSE,
    skill_level ENUM ('beginner', 'intermediate', 'advanced', 'all') DEFAULT 'all',
    photo_url VARCHAR(500) NULL,
    requirements TEXT NULL,
    what_to_bring TEXT NULL,
    is_online BOOLEAN DEFAULT FALSE,
    meeting_url VARCHAR(500) NULL,
    status ENUM ('draft', 'published', 'cancelled', 'completed') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (organizer_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (community_id) REFERENCES communities (id) ON DELETE SET NULL,
    INDEX idx_organizer_id (organizer_id),
    INDEX idx_community_id (community_id),
    INDEX idx_event_date (event_date),
    INDEX idx_category (category),
    INDEX idx_status (status)
  );

-- Asistentes a eventos
CREATE TABLE
  event_attendees (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    event_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    status ENUM (
      'registered',
      'confirmed',
      'attended',
      'no_show',
      'cancelled'
    ) DEFAULT 'registered',
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT NULL,
    FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    UNIQUE KEY unique_event_attendee (event_id, user_id),
    INDEX idx_event_id (event_id),
    INDEX idx_user_id (user_id),
    INDEX idx_status (status)
  );

-- =============================================
-- TABLAS DE UBICACIONES Y MAPA
-- =============================================
-- Ubicaciones en el mapa
CREATE TABLE
  locations (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    provider_id BIGINT UNSIGNED NULL, -- Si es una ubicación de proveedor
    name VARCHAR(255) NOT NULL,
    description TEXT NULL,
    address TEXT NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    phone VARCHAR(20) NULL,
    website VARCHAR(255) NULL,
    email VARCHAR(255) NULL,
    opening_hours JSON NULL, -- Horarios por día de la semana
    rating DECIMAL(3, 2) DEFAULT 0.00,
    review_count INT DEFAULT 0,
    photo_url VARCHAR(500) NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (provider_id) REFERENCES providers (id) ON DELETE CASCADE,
    INDEX idx_provider_id (provider_id),
    INDEX idx_location (latitude, longitude),
    INDEX idx_is_active (is_active)
  );

-- Servicios disponibles en cada ubicación
CREATE TABLE
  location_services (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    location_id BIGINT UNSIGNED NOT NULL,
    service_type ENUM (
      'donate',
      'repair',
      'transform',
      'recycle',
      'buy',
      'sell'
    ) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NULL,
    price_info VARCHAR(255) NULL,
    is_available BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (location_id) REFERENCES locations (id) ON DELETE CASCADE,
    INDEX idx_location_id (location_id),
    INDEX idx_service_type (service_type)
  );

-- =============================================
-- TABLAS DE NOTIFICACIONES
-- =============================================
-- Notificaciones
CREATE TABLE
  notifications (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    type VARCHAR(100) NOT NULL, -- 'new_request', 'request_accepted', 'appointment_reminder', etc.
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    data JSON NULL, -- Datos adicionales específicos del tipo de notificación
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP NULL,
    action_url VARCHAR(500) NULL, -- URL para acción relacionada
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_type (type),
    INDEX idx_is_read (is_read),
    INDEX idx_created_at (created_at)
  );

-- Configuración de notificaciones por usuario
CREATE TABLE
  notification_settings (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    push_notifications BOOLEAN DEFAULT TRUE,
    email_notifications BOOLEAN DEFAULT TRUE,
    sms_notifications BOOLEAN DEFAULT FALSE,
    event_reminders BOOLEAN DEFAULT TRUE,
    community_updates BOOLEAN DEFAULT TRUE,
    new_materials BOOLEAN DEFAULT TRUE,
    scan_results BOOLEAN DEFAULT TRUE,
    marketing_emails BOOLEAN DEFAULT FALSE,
    sound_enabled BOOLEAN DEFAULT TRUE,
    vibration_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_settings (user_id)
  );

-- =============================================
-- TABLAS DE FAVORITOS Y LISTAS
-- =============================================
-- Favoritos de usuarios (proveedores, biotextiles, eventos, etc.)
CREATE TABLE
  favorites (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    favoritable_type VARCHAR(100) NOT NULL, -- 'provider', 'biotextile', 'event', etc.
    favoritable_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    UNIQUE KEY unique_favorite (user_id, favoritable_type, favoritable_id),
    INDEX idx_user_id (user_id),
    INDEX idx_favoritable (favoritable_type, favoritable_id)
  );

-- =============================================
-- INSERTAR DATOS INICIALES
-- =============================================
-- Categorías de servicios
INSERT INTO
  service_categories (name, slug, icon, color, description)
VALUES
  (
    'Reparación',
    'repair',
    'tool',
    '#16a34a',
    'Servicios de reparación y arreglo de prendas'
  ),
  (
    'Transformación',
    'transform',
    'refresh-cw',
    '#2563eb',
    'Upcycling y rediseño de prendas'
  ),
  (
    'Cursos',
    'courses',
    'book-open',
    '#7c3aed',
    'Talleres y cursos de costura y sostenibilidad'
  ),
  (
    'Consultoría',
    'consulting',
    'briefcase',
    '#ea580c',
    'Asesoramiento en moda sostenible'
  ),
  (
    'Reciclaje',
    'recycling',
    'recycle',
    '#059669',
    'Servicios de reciclaje textil'
  ),
  (
    'Diseño',
    'design',
    'scissors',
    '#dc2626',
    'Diseño personalizado y a medida'
  );

-- Datos de ejemplo para testing
INSERT INTO
  users (email, password_hash, user_type)
VALUES
  (
    'maria@example.com',
    '$2y$10$example_hash',
    'consumer'
  ),
  (
    'atelier@example.com',
    '$2y$10$example_hash',
    'provider'
  ),
  (
    'carlos@example.com',
    '$2y$10$example_hash',
    'consumer'
  );

INSERT INTO
  user_profiles (user_id, first_name, last_name, location)
VALUES
  (1, 'María', 'González', 'Palermo, CABA'),
  (3, 'Carlos', 'Ruiz', 'Villa Crespo, CABA');

INSERT INTO
  providers (
    user_id,
    business_name,
    business_type,
    description,
    address,
    phone
  )
VALUES
  (
    2,
    'Atelier Verde',
    'atelier',
    'Especialistas en reparación y transformación sostenible',
    'Av. Córdoba 1234, Palermo, CABA',
    '+54 11 1234-5678'
  );

-- Crear índices adicionales para optimización
CREATE INDEX idx_requests_status_date ON requests (status, created_at);

CREATE INDEX idx_appointments_provider_date ON appointments (provider_id, appointment_date, status);

CREATE INDEX idx_biotextiles_category_verified ON biotextiles (category, is_verified);

CREATE INDEX idx_events_date_status ON events (event_date, status);

CREATE INDEX idx_wardrobe_user_category ON wardrobe_items (user_id, category);

-- Crear vistas útiles
CREATE VIEW
  provider_dashboard_stats AS
SELECT
  p.id as provider_id,
  p.business_name,
  COUNT(DISTINCT r.id) as total_requests,
  COUNT(
    DISTINCT CASE
      WHEN r.status = 'pending' THEN r.id
    END
  ) as pending_requests,
  COUNT(
    DISTINCT CASE
      WHEN r.status = 'completed' THEN r.id
    END
  ) as completed_requests,
  AVG(rev.rating) as average_rating,
  COUNT(DISTINCT rev.id) as total_reviews,
  SUM(
    CASE
      WHEN r.status = 'completed' THEN r.final_price
      ELSE 0
    END
  ) as total_earnings
FROM
  providers p
  LEFT JOIN requests r ON p.id = r.provider_id
  LEFT JOIN reviews rev ON p.user_id = rev.reviewed_id
GROUP BY
  p.id,
  p.business_name;

-- Procedimientos almacenados útiles
DELIMITER / / CREATE PROCEDURE UpdateProviderStats (IN provider_id BIGINT) BEGIN
INSERT INTO
  provider_stats (
    provider_id,
    total_jobs,
    completed_jobs,
    average_rating,
    total_reviews,
    total_earnings
  )
SELECT
  provider_id,
  COUNT(*) as total_jobs,
  SUM(
    CASE
      WHEN status = 'completed' THEN 1
      ELSE 0
    END
  ) as completed_jobs,
  COALESCE(AVG(rev.rating), 0) as average_rating,
  COUNT(DISTINCT rev.id) as total_reviews,
  SUM(
    CASE
      WHEN status = 'completed' THEN final_price
      ELSE 0
    END
  ) as total_earnings
FROM
  requests r
  LEFT JOIN reviews rev ON r.id = rev.request_id
WHERE
  r.provider_id = provider_id ON DUPLICATE KEY
UPDATE total_jobs =
VALUES
  (total_jobs),
  completed_jobs =
VALUES
  (completed_jobs),
  average_rating =
VALUES
  (average_rating),
  total_reviews =
VALUES
  (total_reviews),
  total_earnings =
VALUES
  (total_earnings);

END / / DELIMITER;