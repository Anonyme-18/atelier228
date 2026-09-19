import { describe, it, expect } from "vitest";
import { validateQuote, sanitize } from "../src/lib/api";

describe("API - Validation", () => {
  describe("sanitize", () => {
    it("should trim whitespace", () => {
      expect(sanitize("  hello  ", 100)).toBe("hello");
    });

    it("should normalize spaces", () => {
      expect(sanitize("hello   world", 100)).toBe("hello world");
    });

    it("should respect max length", () => {
      expect(sanitize("hello world", 5)).toBe("hello");
    });
  });

  describe("validateQuote", () => {
    it("should return errors for empty fields", () => {
      const errors = validateQuote({
        fullName: "",
        email: "",
        phone: "",
        projectType: "",
        projectDescription: "",
        location: "",
        budget: "",
        desiredDate: "",
        website: "",
      });

      expect(errors.fullName).toBeDefined();
      expect(errors.email).toBeDefined();
      expect(errors.phone).toBeDefined();
      expect(errors.projectType).toBeDefined();
      expect(errors.projectDescription).toBeDefined();
    });

    it("should return no errors for valid input", () => {
      const errors = validateQuote({
        fullName: "John Doe",
        email: "john@example.com",
        phone: "+22890123456",
        projectType: "Rénovation complète",
        projectDescription: "This is a valid project description with enough characters.",
        location: "Lomé",
        budget: "1 à 3 millions FCFA",
        desiredDate: "2024-06",
        website: "",
      });

      expect(Object.keys(errors)).toHaveLength(0);
    });

    it("should reject invalid email", () => {
      const errors = validateQuote({
        fullName: "John Doe",
        email: "invalid-email",
        phone: "+22890123456",
        projectType: "Rénovation complète",
        projectDescription: "This is a valid project description with enough characters.",
        location: "",
        budget: "",
        desiredDate: "",
        website: "",
      });

      expect(errors.email).toBeDefined();
    });

    it("should reject short phone number", () => {
      const errors = validateQuote({
        fullName: "John Doe",
        email: "john@example.com",
        phone: "123",
        projectType: "Rénovation complète",
        projectDescription: "This is a valid project description with enough characters.",
        location: "",
        budget: "",
        desiredDate: "",
        website: "",
      });

      expect(errors.phone).toBeDefined();
    });

    it("should reject short project description", () => {
      const errors = validateQuote({
        fullName: "John Doe",
        email: "john@example.com",
        phone: "+22890123456",
        projectType: "Rénovation complète",
        projectDescription: "Too short",
        location: "",
        budget: "",
        desiredDate: "",
        website: "",
      });

      expect(errors.projectDescription).toBeDefined();
    });
  });
});
