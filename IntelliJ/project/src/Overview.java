public class Overview {
    protected static interface Configuration{
        int m = 15;
        int n = 10;
        int init_plan_min = 3;
        int init_plan_sec = 0;
        static long init_budget = 5000;
        int init_center_dep = 100;
        int plan_rev_min = 30;
        int plan_rev_sec = 0;
        int rev_cost = 1000;
        int max_dep = 100000;
        int interest_pct = 5;
    }
    public interface Player extends Configuration{
        void Action();
    }
    public interface Action_Command{
        void move();
        void invest();
        void shoot();
        void collect();
        void relocate();
    }
    public interface Territory{
        void create_region();
    }
    public interface Region{

    }
    public interface City{

    }
    public interface CityCrew{

    }
    public interface Parser{

    }
    public interface Tokenizer{
        
    }
    public interface Evaluator{

    }
}
