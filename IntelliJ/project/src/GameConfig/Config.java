package GameConfig;

public interface Config { // not used yet!
    long rows();
    long cols();
    long initialPlanMinutes();
    long initialPlanSeconds();
    long initialBudget();
    long initialDeposit();
    long revisionPlanMinutes();
    long revisionPlanSeconds();
    long revisionCost();
    long maxDeposit();
    double interestPercentage(long turn, long deposit);
}