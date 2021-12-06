package se.edument.javamultistage;

import java.text.DecimalFormat;

public class Main {
    public static void main(String... args) {
        System.out.println(
                "Length of vector (1, 1): " + new DecimalFormat("0.0000").format(
                        VectorUtils.length(1, 1)
                )
        );
    }
}
