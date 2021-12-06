package se.edument.javamultistage;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class VectorUtilsTest {

    @Test
    void length() {
        assertEquals(Math.sqrt(2), VectorUtils.length(1, 1), 0.000001d);
    }
}