import { describe, test, expect } from "bun:test";
import { formatDate, formatDateRange, formatDateTime, formatDateTimeRange } from "./contentFilters";

describe("formatDate", () => {
  test("formats a date with year by default", () => {
    const result = formatDate("2026-02-12", true, 2026);
    expect(result).toBe("12 februari 2026");
  });

  test("formats date without year when showYear=false", () => {
    const result = formatDate("2024-03-05", false, 2026);
    expect(result).toBe("5 mars");
  });

  test("formats date with year when showYear=true explicitly", () => {
    const result = formatDate("2027-12-25", true, 2026);
    expect(result).toBe("25 december 2027");
  });

  test("formats date in single-digit day with year", () => {
    const result = formatDate("2030-01-01", true, 2026);
    expect(result).toBe("1 januari 2030");
  });
});

describe("formatDateRange", () => {
  test("returns single date without year by default", () => {
    const result = formatDateRange("2026-02-12", "2026-02-12", false, 2026);
    expect(result).toBe("12 februari");
  });

  test("returns single date with year when showYear=true", () => {
    const result = formatDateRange("2026-02-12", "2026-02-12", true, 2026);
    expect(result).toBe("12 februari 2026");
  });

  test("formats range with same month and year without year (default)", () => {
    const result = formatDateRange("2026-02-12", "2026-02-13", false, 2026);
    expect(result).toBe("12–13 februari");
  });

  test("formats range with same month and year with year when showYear=true", () => {
    const result = formatDateRange("2024-02-05", "2024-02-28", true, 2026);
    expect(result).toBe("5–28 februari 2024");
  });

  test("formats range with different months, same year without year (default)", () => {
    const result = formatDateRange("2026-02-12", "2026-03-13", false, 2026);
    expect(result).toBe("12 februari – 13 mars");
  });

  test("formats range with different months, same year with year when showYear=true", () => {
    const result = formatDateRange("2027-01-05", "2027-06-08", true, 2026);
    expect(result).toBe("5 januari – 8 juni 2027");
  });

  test("formats range with different years without year (default)", () => {
    const result = formatDateRange("2025-12-30", "2026-01-05", false, 2026);
    expect(result).toBe("30 december – 5 januari");
  });

  test("formats range with different years with year when showYear=true", () => {
    const result = formatDateRange("2026-12-30", "2027-01-05", true, 2026);
    expect(result).toBe("30 december 2026 – 5 januari 2027");
  });

  test("formats range between two years with years shown", () => {
    const result = formatDateRange("2027-06-15", "2028-06-20", true, 2026);
    expect(result).toBe("15 juni 2027 – 20 juni 2028");
  });

  test("formats range between two years without years (default)", () => {
    const result = formatDateRange("2024-06-15", "2025-06-20", false, 2026);
    expect(result).toBe("15 juni – 20 juni");
  });
});

describe("formatDateTime", () => {
  test("formats date with time", () => {
    const result = formatDateTime("2026-02-12", "14:30", true, 2026);
    expect(result).toBe("12 februari 2026, 14:30");
  });

  test("formats date without time (behaves like formatDate)", () => {
    const result = formatDateTime("2026-02-12", null, true, 2026);
    expect(result).toBe("12 februari 2026");
  });

  test("formats date with time, no year", () => {
    const result = formatDateTime("2026-02-12", "09:15", false, 2026);
    expect(result).toBe("12 februari, 09:15");
  });

  test("formats date without time and no year", () => {
    const result = formatDateTime("2026-02-12", null, false, 2026);
    expect(result).toBe("12 februari");
  });
});

describe("formatDateTimeRange", () => {
  test("same date with time range", () => {
    const result = formatDateTimeRange("2026-02-12", "2026-02-12", "10:00", "12:00", false, 2026);
    expect(result).toBe("12 februari, 10:00–12:00");
  });

  test("same date with time range and year", () => {
    const result = formatDateTimeRange("2027-02-12", "2027-02-12", "14:00", "16:30", true, 2026);
    expect(result).toBe("12 februari 2027, 14:00–16:30");
  });

  test("same date with only start time", () => {
    const result = formatDateTimeRange("2026-02-12", "2026-02-12", "10:00", null, false, 2026);
    expect(result).toBe("12 februari, 10:00");
  });

  test("same date without times", () => {
    const result = formatDateTimeRange("2026-02-12", "2026-02-12", null, null, false, 2026);
    expect(result).toBe("12 februari");
  });

  test("same month with times, no year", () => {
    const result = formatDateTimeRange("2026-02-12", "2026-02-14", "10:00", "18:00", false, 2026);
    expect(result).toBe("12 februari, 10:00 – 14 februari, 18:00");
  });

  test("same month with times and year", () => {
    const result = formatDateTimeRange("2027-06-10", "2027-06-15", "09:00", "17:00", true, 2026);
    expect(result).toBe("10 juni 2027, 09:00 – 15 juni 2027, 17:00");
  });

  test("different months with times, no year", () => {
    const result = formatDateTimeRange("2026-02-28", "2026-03-02", "10:00", "16:00", false, 2026);
    expect(result).toBe("28 februari, 10:00 – 2 mars, 16:00");
  });

  test("different months with times and year", () => {
    const result = formatDateTimeRange("2027-12-30", "2027-01-05", "18:00", "12:00", true, 2026);
    expect(result).toBe("30 december 2027, 18:00 – 5 januari 2027, 12:00");
  });

  test("different years with times", () => {
    const result = formatDateTimeRange("2026-12-31", "2027-01-01", "23:00", "01:00", true, 2026);
    expect(result).toBe("31 december 2026, 23:00 – 1 januari 2027, 01:00");
  });

  test("different dates without times, no year", () => {
    const result = formatDateTimeRange("2026-02-12", "2026-02-15", null, null, false, 2026);
    expect(result).toBe("12 februari – 15 februari");
  });
});
