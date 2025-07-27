# Sigma Rule Generator Web Application

## Overview

This is a modern, responsive web application for generating Sigma rules through a structured user interface. The application provides a form-based approach to creating cybersecurity detection rules with live YAML preview functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a full-stack architecture with a clear separation between frontend and backend components:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: React hooks with custom form management
- **Routing**: Wouter for lightweight client-side routing
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for type safety
- **API Design**: RESTful API with /api prefix routing
- **Development**: Hot module replacement via Vite integration

### Data Storage Strategy
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Management**: Drizzle Kit for migrations
- **Development Storage**: In-memory storage for rapid prototyping
- **Connection**: Neon Database serverless for production

## Key Components

### Form Management System
The application uses a custom hook-based form management system that handles:
- Dynamic field validation using Zod schemas
- Real-time form state updates
- Complex nested object management for detection blocks
- UUID generation for rule identification

### UI Component Library
Built on shadcn/ui providing:
- Consistent design system with CSS variables
- Dark/light theme support
- Accessible components using Radix UI primitives
- Form controls optimized for Sigma rule fields

### YAML Generation Engine
Custom utilities for converting form data to valid Sigma YAML:
- Real-time preview updates
- Proper YAML formatting and structure
- Download functionality with automatic filename generation
- Clipboard integration for easy sharing

## Data Flow

1. **User Input**: Form data is captured through controlled components
2. **Validation**: Zod schemas validate data structure and types
3. **State Management**: Custom hooks manage form state and updates
4. **YAML Generation**: Utility functions convert form data to YAML
5. **Preview Update**: Live preview updates as user types
6. **Export Options**: Users can download or copy generated YAML

## External Dependencies

### UI and Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography
- **React Syntax Highlighter**: YAML syntax highlighting

### Development Tools
- **Drizzle**: Type-safe ORM for database operations
- **Zod**: Runtime type validation and schema definition
- **js-yaml**: YAML parsing and stringification
- **date-fns**: Date manipulation utilities

### Build and Development
- **Vite**: Fast build tool with HMR support
- **ESBuild**: Fast JavaScript bundler for production
- **TypeScript**: Static type checking
- **PostCSS**: CSS processing with Autoprefixer

## Deployment Strategy

### Development Environment
- Vite dev server with hot module replacement
- In-memory storage for rapid iteration
- TypeScript compilation checking
- Replit integration with development banner

### Production Build
- Vite builds optimized client-side assets
- ESBuild bundles server code for Node.js
- Static file serving from Express
- Environment-based configuration

### Database Strategy
- Development: PostgreSQL with Drizzle migrations
- Production: Neon Database serverless connection
- Schema versioning through Drizzle Kit
- Connection pooling for performance

The architecture prioritizes developer experience with fast feedback loops while maintaining production readiness through TypeScript safety, optimized builds, and scalable database solutions.