// src/collision.test.js

import { projectile_collision } from './collision.js';

describe('projectile_collision', () => {
  test('should return true when target and projectile overlap', () => {
    const target = {
      position: { x: 100, y: 100 },
      width: 50,
      height: 50,
    };

    const projectile = {
      position: { x: 120, y: 120 },
      width: 20,
      height: 20,
    };

    expect(projectile_collision(target, projectile)).toBe(true);
  });

  test('should return false when target and projectile are far apart', () => {
    const target = {
      position: { x: 100, y: 100 },
      width: 50,
      height: 50,
    };

    const projectile = {
      position: { x: 200, y: 200 },
      width: 20,
      height: 20,
    };

    expect(projectile_collision(target, projectile)).toBe(false);
  });

  test('should return true when projectile touches the edge of the target', () => {
    const target = {
      position: { x: 100, y: 100 },
      width: 50,
      height: 50,
    };

    const projectile = {
      position: { x: 125, y: 100 }, // Exactly touching the right edge
      width: 50,
      height: 50,
    };

    expect(projectile_collision(target, projectile)).toBe(true);
  });

  test('should return false when projectile is just outside the target boundary', () => {
    const target = {
      position: { x: 100, y: 100 },
      width: 50,
      height: 50,
    };

    const projectile = {
      position: { x: 126, y: 100 }, // 1 unit outside the right edge
      width: 50,
      height: 50,
    };

    expect(projectile_collision(target, projectile)).toBe(false);
  });

  test('should handle different sizes correctly (collision)', () => {
    const target = {
      position: { x: 50, y: 50 },
      width: 30,
      height: 30,
    };

    const projectile = {
      position: { x: 60, y: 60 },
      width: 40,
      height: 40,
    };

    expect(projectile_collision(target, projectile)).toBe(true);
  });

  test('should handle different sizes correctly (no collision)', () => {
    const target = {
      position: { x: 50, y: 50 },
      width: 30,
      height: 30,
    };

    const projectile = {
      position: { x: 150, y: 150 },
      width: 40,
      height: 40,
    };

    expect(projectile_collision(target, projectile)).toBe(false);
  });

  test('should return true for multiple overlapping projectiles', () => {
    const target = {
      position: { x: 100, y: 100 },
      width: 50,
      height: 50,
    };

    const projectiles = [
      { position: { x: 90, y: 90 }, width: 30, height: 30 },
      { position: { x: 130, y: 100 }, width: 40, height: 40 },
      { position: { x: 100, y: 160 }, width: 20, height: 20 },
    ];

    projectiles.forEach((projectile) => {
      expect(projectile_collision(target, projectile)).toBe(true);
    });
  });

  test('should return false for multiple non-overlapping projectiles', () => {
    const target = {
      position: { x: 100, y: 100 },
      width: 50,
      height: 50,
    };

    const projectiles = [
      { position: { x: 10, y: 10 }, width: 20, height: 20 },
      { position: { x: 200, y: 200 }, width: 30, height: 30 },
      { position: { x: 300, y: 100 }, width: 40, height: 40 },
    ];

    projectiles.forEach((projectile) => {
      expect(projectile_collision(target, projectile)).toBe(false);
    });
  });

  test('should handle zero-sized projectiles or targets gracefully', () => {
    const target = {
      position: { x: 100, y: 100 },
      width: 0,
      height: 0,
    };

    const projectile = {
      position: { x: 100, y: 100 },
      width: 0,
      height: 0,
    };

    expect(projectile_collision(target, projectile)).toBe(true);
  });

  test('should handle negative dimensions correctly', () => {
    const target = {
      position: { x: 100, y: 100 },
      width: -50,
      height: -50,
    };

    const projectile = {
      position: { x: 100, y: 100 },
      width: -20,
      height: -20,
    };

    expect(projectile_collision(target, projectile)).toBe(true);
  });
});
